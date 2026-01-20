FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:10.0-alpine AS build
WORKDIR /src
COPY . .

ARG TARGETARCH

RUN --mount=type=cache,id=nuget,target=/root/.nuget/packages \
    dotnet publish -a ${TARGETARCH/amd64/x64} --use-current-runtime --self-contained false -o /app

FROM mcr.microsoft.com/dotnet/aspnet:10.0-alpine AS final
WORKDIR /app

COPY --from=build /app .

ENV ASPNETCORE_HTTP_PORTS=5189
EXPOSE 5189

ARG APP_UID=1001
USER $APP_UID

ENTRYPOINT ["dotnet", "PokemonApi.dll"]
