using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace PokemonApi.Contracts.Requests;

public sealed class SearchPokemonRequest
{
    [FromQuery(Name = "q")]
    [Required]
    [MinLength(2)]
    public string Q { get; init; } = string.Empty;
}
