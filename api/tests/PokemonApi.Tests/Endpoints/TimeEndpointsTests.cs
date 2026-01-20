using System.Net.Http.Json;
using PokemonApi.Endpoints;

namespace PokemonApi.Tests.Endpoints;

public class TimeEndpointsTests
{
    [Fact]
    public async Task GetTime_ReturnsNetworkTime()
    {
        var expected = new DateTimeOffset(2024, 3, 12, 8, 30, 45, TimeSpan.Zero);
        using var factory = TestHelpers.CreateFactory(
            ntpService: new StubNtpService(expected)
        );
        using var client = factory.CreateClient();

        var response = await client.GetFromJsonAsync<NtpEndpoints.TimeResponse>("/api/time");

        Assert.NotNull(response);
        Assert.Equal(expected, response!.Time);
    }
}
