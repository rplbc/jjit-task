using System.ComponentModel.DataAnnotations;

namespace PokemonApi.Contracts.Requests;

public class RegisterTrainerRequest
{
    [Required]
    [MinLength(2)]
    [MaxLength(20)]
    public string Name { get; init; } = string.Empty;

    [Range(16, 99)]
    public int Age { get; init; }

    [Required]
    public string Pokemon { get; init; } = string.Empty;
}
