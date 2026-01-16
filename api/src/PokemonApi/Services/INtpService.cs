namespace PokemonApi.Services;

public interface INtpService
{
    Task<DateTimeOffset> GetNetworkTimeAsync();
}
