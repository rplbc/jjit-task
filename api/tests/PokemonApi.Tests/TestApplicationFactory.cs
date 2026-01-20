using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using PokemonApi.Services;

namespace PokemonApi.Tests;

public sealed class TestApplicationFactory : WebApplicationFactory<Program>
{
    private readonly INtpService _ntpService;
    private readonly IPokemonDetailsService _pokemonDetailsService;
    private readonly IPokemonCatalog _pokemonCatalog;

    public TestApplicationFactory(
        INtpService ntpService,
        IPokemonDetailsService pokemonDetailsService,
        IPokemonCatalog pokemonCatalog)
    {
        _ntpService = ntpService;
        _pokemonDetailsService = pokemonDetailsService;
        _pokemonCatalog = pokemonCatalog;
    }

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            services.RemoveAll<INtpService>();
            services.RemoveAll<IPokemonDetailsService>();
            services.RemoveAll<IPokemonCatalog>();

            services.AddSingleton(_ntpService);
            services.AddSingleton(_pokemonDetailsService);
            services.AddSingleton(_pokemonCatalog);
        });
    }
}
