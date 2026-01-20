using System.Net;
using System.Net.Http.Json;
using PokemonApi.Models;

namespace PokemonApi.Tests.Endpoints;

public class SearchEndpointsTests
{
    [Fact]
    public async Task Search_ReturnsMatches()
    {
        using var factory = TestHelpers.CreateFactory(
            pokemonCatalog: new StubPokemonCatalog(
                new[] { new PokemonSummary(25, "pikachu"), new PokemonSummary(1, "bulbasaur") }
            )
        );
        using var client = factory.CreateClient();

        var results = await client.GetFromJsonAsync<PokemonSummary[]>("/api/search?q=pika");

        Assert.NotNull(results);
        Assert.Contains(results!, pokemon => pokemon.Name.Equals("pikachu", StringComparison.OrdinalIgnoreCase));
    }

    [Fact]
    public async Task Search_ReturnsBadRequest_WhenMissingQuery()
    {
        using var factory = TestHelpers.CreateFactory();
        using var client = factory.CreateClient();

        var response = await client.GetAsync("/api/search");

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task Search_ReturnsBadRequest_WhenQueryTooShort()
    {
        using var factory = TestHelpers.CreateFactory();
        using var client = factory.CreateClient();

        var response = await client.GetAsync("/api/search?q=a");

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task Search_ReturnsBadRequest_WhenQueryIsWhitespace()
    {
        using var factory = TestHelpers.CreateFactory();
        using var client = factory.CreateClient();

        var response = await client.GetAsync("/api/search?q=%20%20");

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }
}
