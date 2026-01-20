namespace PokemonApi.Services;

public interface IPokemonDetailsService
{
    Task<PokemonDetailsModel?> GetPokemonAsync(int id, CancellationToken cancellationToken);
}
