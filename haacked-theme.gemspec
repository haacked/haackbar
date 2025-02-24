# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "haackbar"
  spec.version       = "0.2.0"
  spec.authors       = ["Phil Haack"]
  spec.email         = ["haacked@gmail.com"]

  spec.summary       = "Theme based off of Minima and Greyshade used by haacked.com"
  spec.homepage      = "https://github.com/haacked/haackbar"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(assets|_layouts|_includes|_sass|LICENSE|README)}i) }

  spec.add_runtime_dependency "jekyll", "~> 3.10.0"
  spec.add_runtime_dependency "jekyll-feed", "~> 0.17.0"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.8.0"
  spec.add_runtime_dependency "jekyll-paginate", "~> 1.1.0"
  spec.add_runtime_dependency "jekyll-gfm-admonitions", "~> 0.1.0"
  spec.add_runtime_dependency "jekyll-include-cache", "~> 0.2.1"
  spec.add_runtime_dependency "kramdown-parser-gfm", "~> 1.1.0"
  spec.add_development_dependency "bundler", "~> 2.6.5"
  spec.add_development_dependency "rake", "~> 13.0.6"
end
