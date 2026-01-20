using PokemonApi.Endpoints;
using PokemonApi.Services;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<INtpService, NtpService>();
builder.Services.AddSingleton<IPokemonCatalog, PokemonCatalog>();

builder.Services.AddMemoryCache();

builder.Services.AddHttpClient<IPokemonDetailsService, PokemonDetailsService>();

builder.Services.AddValidation();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.MapOpenApi();
    app.MapScalarApiReference();
}
else
{
    app.UseExceptionHandler(err => err.Run(async ctx => await Results.Problem().ExecuteAsync(ctx)));
}

app.UseCors();

var api = app.MapGroup("/api");

api.MapTimeEndpoints();
api.MapSearchEndpoints();
api.MapPokemonEndpoints();
api.MapTrainerEndpoints();

app.Run();
