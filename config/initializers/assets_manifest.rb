Rails.application.config.assets_manifest =
    if File.exist?(Rails.root.join('client', 'build', 'manifest.json'))
      JSON.parse(File.read(Rails.root.join('client', 'build', 'manifest.json')))
    end