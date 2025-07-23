{ pkgs }: {
  deps = [
    pkgs.ruby_3_2
    pkgs.libyaml.dev
    pkgs.pkg-config
    pkgs.libffi
    pkgs.gcc
    pkgs.docker-compose
    pkgs.nodejs
    pkgs.sqlite
  ];
  services.docker = {
    enable = true;
    group = "replit";
  };
}