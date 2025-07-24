{ pkgs }: {
  deps = [
    pkgs.ruby_3_2
    pkgs.libyaml.dev
    pkgs.pkg-config
    pkgs.libffi
    pkgs.gcc
    pkgs.nodejs
    pkgs.sqlite
  ];
}