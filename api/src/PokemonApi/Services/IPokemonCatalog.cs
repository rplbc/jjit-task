namespace PokemonApi.Services;

public interface IPokemonCatalog
{
    IReadOnlyList<string> Names { get; }
}
