Pod::Spec.new do |s|

  s.name         = "XT"
  s.version      = "0.4.2"
  s.summary      = "A Cross-Platform Application Framework."

  s.description  = <<-DESC
                   XT is a Cross-Platform Application Framework, you can develop iOS / Android / Web Application via XT.
                   DESC

  s.homepage     = "https://github.com/XTStudio/XT"
  s.license      = "MIT"
  s.author             = { "PonyCui" => "cuis@vip.qq.com" }
  s.platform     = :ios, "8.0"
  s.source       = { :git => "https://github.com/XTStudio/XT.git", :tag => "#{s.version}" }
  s.framework  = "JavaScriptCore"
  s.requires_arc = true

  s.subspec "Core" do |core|
    core.source_files = "ios/Sources/Core/*.{h,m}"
    core.resources = "ios/Sources/Core/*.{js}"
    core.dependency "SocketRocket"
  end

  s.subspec "Foundation" do |foundation|
    foundation.source_files = "ios/Sources/Foundation/*.{h,m}"
    foundation.resources = "ios/Sources/Foundation/*.{js}"
    foundation.dependency "XT/Core"
    foundation.dependency "CocoaSecurity"
    foundation.dependency "SocketRocket"
    foundation.dependency "FMDB"
  end

  s.subspec "UIKit" do |uikit|
    uikit.source_files = "ios/Sources/UIKit/*.{h,m}"
    uikit.resources = "ios/Sources/UIKit/*.{js}"
    uikit.dependency "XT/Core"
    uikit.dependency "YYWebImage"
  end

end
