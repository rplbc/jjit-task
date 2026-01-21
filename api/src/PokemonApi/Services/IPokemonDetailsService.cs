using PokemonApi.Contracts.Responses;

namespace PokemonApi.Services;

public interface IPokemonDetailsService
{
    Task<PokemonDetailsResponse?> GetPokemonAsync(int id);
}
