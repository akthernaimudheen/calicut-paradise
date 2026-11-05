$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$artDir = "C:\Users\akthe\.gemini\antigravity\brain\afab0ff6-1460-4e1e-9c73-7b310caba5a9"
$repoScreenshots = "C:\Users\akthe\.gemini\antigravity\scratch\calicut-paradise\docs\screenshots"

New-Item -ItemType Directory -Force -Path $repoScreenshots | Out-Null

$jobs = @(
    @{ File = "desktop_hero_1440.png"; Url = "http://127.0.0.1:3000"; W = 1440; H = 900 },
    @{ File = "desktop_hero_1920.png"; Url = "http://127.0.0.1:3000"; W = 1920; H = 1080 },
    @{ File = "desktop_hero_slide2.png"; Url = "http://127.0.0.1:3000/test-slide/1"; W = 1440; H = 900 },
    @{ File = "desktop_hero_slide3.png"; Url = "http://127.0.0.1:3000/test-slide/2"; W = 1440; H = 900 },
    @{ File = "hero_facts_transition.png"; Url = "http://127.0.0.1:3000"; W = 1440; H = 1100 },
    @{ File = "mobile_hero_390.png"; Url = "http://127.0.0.1:3000"; W = 390; H = 844 }
)

foreach ($j in $jobs) {
    $outPath = Join-Path $artDir $j.File
    $args = "--headless --disable-gpu --hide-scrollbars --window-size=$($j.W),$($j.H) --screenshot=$outPath $($j.Url)"
    Start-Process -FilePath $chrome -ArgumentList $args -Wait
    Copy-Item $outPath -Destination (Join-Path $repoScreenshots $j.File) -Force
    Write-Output ("Captured: " + $j.File)
}

Write-Output "All 6 QA screenshots captured successfully!"
