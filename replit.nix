{ pkgs }: {
  deps = [
    pkgs.rubyPackages.bundler,
    pkgs.postgresql,
    pkgs.libyaml,
    pkgs.libffi
  ];
}