# syntax=docker/dockerfile:1

FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:10.0-alpine AS build
WORKDIR /src

ARG TARGETARCH

COPY PokemonApi.csproj ./
RUN --mount=type=cache,id=nuget,target=/root/.nuget/packages \
    dotnet restore PokemonApi.csproj

COPY . ./
RUN --mount=type=cache,id=nuget,target=/root/.nuget/packages \
    dotnet publish PokemonApi.csproj \
      -a ${TARGETARCH/amd64/x64} \
      --use-current-runtime \
      --self-contained false \
      --no-restore \
      -o /app \
      /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0-alpine AS final
WORKDIR /app

COPY --from=build /app .

ARG APP_UID=1001
RUN addgroup --system --gid ${APP_UID} appgroup && \
    adduser --system --uid ${APP_UID} --ingroup appgroup appuser
RUN mkdir -p /app/data && chown -R appuser:appgroup /app/data
USER appuser

ENV ASPNETCORE_URLS=http://+:5189
ENV TRAINERS_FILE_PATH=/app/data/trainers.json
EXPOSE 5189

ENTRYPOINT ["dotnet", "PokemonApi.dll"]
