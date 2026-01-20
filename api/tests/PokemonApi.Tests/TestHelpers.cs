using PokemonApi.Models;
using PokemonApi.Services;

namespace PokemonApi.Tests;

public static class TestHelpers
{
    public static TestApplicationFactory CreateFactory(
        INtpService? ntpService = null,
        IPokemonDetailsService? pokemonDetailsService = null,
        IPokemonCatalog? pokemonCatalog = null)
    {
        ntpService ??= new StubNtpService(DateTimeOffset.UtcNow);
        pokemonDetailsService ??= new StubPokemonDetailsService(new Dictionary<int, PokemonDetailsModel?>());
        pokemonCatalog ??= new StubPokemonCatalog(new[] { new PokemonSummary(25, "pikachu") });

        return new TestApplicationFactory(ntpService, pokemonDetailsService, pokemonCatalog);
    }
}
