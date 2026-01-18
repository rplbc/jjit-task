namespace PokemonApi.Services;

public interface IPokemonDetailsService
{
    Task<PokemonDetailsDto?> GetPokemonAsync(int id, CancellationToken cancellationToken);
}
