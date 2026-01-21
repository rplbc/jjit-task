using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace PokemonApi.Contracts.Requests;

public class GetPokemonRequest
{
    [FromQuery(Name = "id")]
    [Range(1, 589)]
    public int Id { get; init; }
}
