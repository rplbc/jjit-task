using System.Net;
using System.Net.Http.Json;
using PokemonApi.Services;

namespace PokemonApi.Tests.Endpoints;

public class PokemonEndpointsTests
{
    [Fact]
    public async Task GetPokemon_ReturnsPokemon()
    {
        var pokemon = new PokemonDetailsDto
        {
            Id = 25,
            Name = "pikachu",
            BaseExperience = 112,
            Img = "https://img.pokemon/25.png",
            Types = new[] { "electric" },
        };

        using var factory = TestHelpers.CreateFactory(
            pokemonDetailsService: new StubPokemonDetailsService(
                new Dictionary<int, PokemonDetailsDto?> { [25] = pokemon }
            )
        );
        using var client = factory.CreateClient();

        var response = await client.GetAsync("/api/pokemon?id=25");
        var payload = await response.Content.ReadFromJsonAsync<PokemonDetailsDto>();

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(payload);
        Assert.Equal("pikachu", payload!.Name);
        Assert.Contains("electric", payload.Types);
    }

    [Fact]
    public async Task GetPokemon_ReturnsNotFound_WhenMissing()
    {
        using var factory = TestHelpers.CreateFactory();
        using var client = factory.CreateClient();

        var response = await client.GetAsync("/api/pokemon?id=999");

        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task GetPokemon_ReturnsBadRequest_WhenIdInvalid()
    {
        using var factory = TestHelpers.CreateFactory();
        using var client = factory.CreateClient();

        var response = await client.GetAsync("/api/pokemon?id=0");

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }
}
