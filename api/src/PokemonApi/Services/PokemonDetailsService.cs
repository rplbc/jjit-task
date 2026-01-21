using System.Net;
using Microsoft.Extensions.Caching.Memory;
using PokemonApi.Contracts.Responses;

namespace PokemonApi.Services;

public sealed class PokemonDetailsService : IPokemonDetailsService
{
    private static readonly TimeSpan CacheDuration = TimeSpan.FromHours(1);
    private readonly HttpClient _httpClient;
    private readonly IMemoryCache _cache;

    public PokemonDetailsService(
        HttpClient httpClient,
        IMemoryCache cache,
        IConfiguration configuration
    )
    {
        _httpClient = httpClient;
        _httpClient.BaseAddress ??= new Uri(
            configuration.GetValue("PokeApiBaseUrl", "https://pokeapi.co/api/v2/")
        );
        _cache = cache;
    }

    public async Task<PokemonDetailsResponse?> GetPokemonAsync(int id)
    {
        var cacheKey = $"pokemon:{id}";
        if (_cache.TryGetValue(cacheKey, out PokemonDetailsResponse? cached))
        {
            return cached;
        }

        var response = await _httpClient.GetAsync($"pokemon/{id}");

        if (response.StatusCode == HttpStatusCode.NotFound)
        {
            return null;
        }

        response.EnsureSuccessStatusCode();

        var payload = await response.Content.ReadFromJsonAsync<PokeApiPokemonResponse>();
        if (payload == null)
        {
            return null;
        }

        var details = new PokemonDetailsResponse
        {
            Id = payload.Id,
            Name = payload.Name,
            BaseExperience = payload.BaseExperience,
            Img = payload.Sprites?.FrontDefault,
            Types = payload.Types?.Select(t => t.Type.Name).ToArray() ?? [],
        };

        _cache.Set(cacheKey, details, CacheDuration);

        return details;
    }
}
