scripts.each do |script|
  # Skip already minified files
  if script.path =~ /.min.js$/
    next
  else
    dest_path = script.path.sub! ".js", ".min.js"
    script_mtime = File.mtime(script.path)

    # Only minify changed files
    unless File.exist?(dest_path) and File.mtime(dest_path) > script_mtime
      Jekyll.logger.debug "Minifying: %s" % script.path
      output = uglifier.compress(File.read(script.path))

      File.open(dest_path, 'w') do |f|
        f.write(output)
      end
    end
  end
end