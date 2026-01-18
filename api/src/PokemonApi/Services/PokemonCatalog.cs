using System.Text.Json;

namespace PokemonApi.Services;

public class PokemonCatalog : IPokemonCatalog
{
    public PokemonCatalog(IWebHostEnvironment environment)
    {
        var jsonPath = Path.Combine(environment.ContentRootPath, "pokemon.json");

        if (!File.Exists(jsonPath))
        {
            throw new FileNotFoundException($"pokemon.json not found.");
        }

        var json = File.ReadAllText(jsonPath);
        var payload = JsonSerializer.Deserialize<PokemonPayload>(json, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
        });

        var pokemon = payload?.Data ?? throw new InvalidOperationException("pokemon.json is missing the data array.");
        Names = pokemon.Select(pokemon => pokemon.Name).ToArray();
    }

    public IReadOnlyList<string> Names { get; }

    public record PokemonEntry(string Name, int Id);

    private record PokemonPayload(List<PokemonEntry> Data);
}
