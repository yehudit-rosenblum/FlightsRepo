using BL.Interfaces;
using Microsoft.Extensions.Options;
using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;

namespace FlightsApi.Middleware
{
    public class WebSocketMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IServiceScopeFactory _serviceScopeFactory;

        public WebSocketMiddleware(RequestDelegate next, IServiceScopeFactory serviceScopeFactory)
        {
            _next = next;
            _serviceScopeFactory = serviceScopeFactory;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if (context.Request.Path == "/ws")
            {
                if (context.WebSockets.IsWebSocketRequest)
                {
                    WebSocket webSocket = await context.WebSockets.AcceptWebSocketAsync();
                    await SendFlightUpdatesAsync(webSocket);
                }
                else
                {
                    context.Response.StatusCode = 400;
                }
            }
            else
            {
                await _next(context);
            }
        }

        private async Task SendFlightUpdatesAsync(WebSocket webSocket)
        {
            // Create a new scope for scoped services like IFlightRepo
            using (var scope = _serviceScopeFactory.CreateScope())
            {
                var _flightRepo = scope.ServiceProvider.GetRequiredService<IFlightRepo>();

                var options = new System.Text.Json.JsonSerializerOptions
                {
                    PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase
                };

                while (webSocket.State == WebSocketState.Open)
                {
                    var flightDtos = await _flightRepo.getFlights();
                    var message = System.Text.Json.JsonSerializer.Serialize(flightDtos, options); // Use camelCase serialization
                    var bytes = Encoding.UTF8.GetBytes(message);
                    await webSocket.SendAsync(new ArraySegment<byte>(bytes, 0, bytes.Length), WebSocketMessageType.Text, true, CancellationToken.None);

                    await Task.Delay(TimeSpan.FromSeconds(30));
                }

                await webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closed by the server", CancellationToken.None);
            }
        }
    }
}
