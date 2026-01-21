using System.ComponentModel.DataAnnotations;

namespace PokemonApi.Models;

public sealed class TrainerRegistrationRequest
{
    [Required]
    [MinLength(2)]
    [MaxLength(20)]
    public string Name { get; init; } = string.Empty;

    [Range(16, 99)]
    public int Age { get; init; }

    [PokemonName]
    public string Pokemon { get; init; } = string.Empty;
}
