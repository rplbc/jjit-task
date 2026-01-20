using System.Net;
using System.Net.Http.Json;
using PokemonApi.Endpoints;

namespace PokemonApi.Tests.Endpoints;

public class TrainerEndpointsTests
{
    [Fact]
    public async Task RegisterTrainer_ReturnsCreated()
    {
        using var factory = TestHelpers.CreateFactory();
        using var client = factory.CreateClient();

        var request = new TrainerEndpoints.TrainerRegistrationRequest
        {
            Name = "  Ash  ",
            Age = 18,
            Pokemon = " pikachu ",
        };

        var response = await client.PostAsJsonAsync("/api/trainer", request);
        var payload = await response.Content.ReadFromJsonAsync<TrainerEndpoints.TrainerRegistrationResponse>();

        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        Assert.NotNull(payload);
        Assert.False(string.IsNullOrWhiteSpace(payload!.Id));
        Assert.Equal("Ash", payload.Name);
        Assert.Equal(18, payload.Age);
        Assert.Equal("pikachu", payload.Pokemon);
    }

    [Fact]
    public async Task RegisterTrainer_ReturnsBadRequest_WhenInvalid()
    {
        using var factory = TestHelpers.CreateFactory();
        using var client = factory.CreateClient();

        var request = new TrainerEndpoints.TrainerRegistrationRequest
        {
            Name = "",
            Age = 10,
            Pokemon = "",
        };

        var response = await client.PostAsJsonAsync("/api/trainer", request);

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task RegisterTrainer_ReturnsBadRequest_WhenWhitespaceOnly()
    {
        using var factory = TestHelpers.CreateFactory();
        using var client = factory.CreateClient();

        var request = new TrainerEndpoints.TrainerRegistrationRequest
        {
            Name = "   ",
            Age = 18,
            Pokemon = "  ",
        };

        var response = await client.PostAsJsonAsync("/api/trainer", request);

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }
}
