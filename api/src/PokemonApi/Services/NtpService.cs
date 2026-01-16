using Microsoft.Extensions.Configuration;
using Yort.Ntp;

namespace PokemonApi.Services;

public class NtpService : INtpService
{
    private const string DefaultServer = "time.google.com";
    private readonly NtpClient _ntpClient;

    public NtpService(IConfiguration configuration)
    {
        var configuredServer = configuration["NtpServer"];
        var server = string.IsNullOrWhiteSpace(configuredServer) ? DefaultServer : configuredServer;
        _ntpClient = new NtpClient(server);
    }

    public async Task<DateTimeOffset> GetNetworkTimeAsync()
    {
        var response = await _ntpClient.RequestTimeAsync();
        var time = response.NtpTime;
        var utcTime = time.Kind switch
        {
            DateTimeKind.Utc => time,
            DateTimeKind.Local => time.ToUniversalTime(),
            _ => DateTime.SpecifyKind(time, DateTimeKind.Utc),
        };

        return new DateTimeOffset(utcTime);
    }
}
