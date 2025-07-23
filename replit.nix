{ pkgs }: {
  deps = [
    pkgs.ruby_3_2
    pkgs.rubyPackages_3_2.bundler,
    pkgs.postgresql,
    pkgs.pkg-config,
    pkgs.libyaml,
    pkgs.libffi
  ];
}
