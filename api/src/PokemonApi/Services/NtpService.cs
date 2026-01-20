using Microsoft.Extensions.Configuration;
using Yort.Ntp;

namespace PokemonApi.Services;

public class NtpService : INtpService
{
    private readonly NtpClient _ntpClient;

    public NtpService(IConfiguration configuration)
    {
        var server = configuration.GetValue("NtpServer", "time.google.com");
        _ntpClient = new NtpClient(server);
    }

    public async Task<DateTimeOffset> GetNetworkTimeAsync()
    {
        var timeResult = await _ntpClient.RequestTimeAsync();
        return new DateTimeOffset(timeResult.NtpTime);
    }
}
