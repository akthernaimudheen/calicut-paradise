$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$artDir = "C:\Users\akthe\.gemini\antigravity\brain\afab0ff6-1460-4e1e-9c73-7b310caba5a9"
$repoScreenshots = "C:\Users\akthe\.gemini\antigravity\scratch\calicut-paradise\docs\screenshots"

New-Item -ItemType Directory -Force -Path $repoScreenshots | Out-Null

$jobs = @(
    @{ File = "desktop_hero_exterior.png"; Url = "http://127.0.0.1:3000"; W = 1440; H = 920 },
    @{ File = "mobile_hero.png"; Url = "http://127.0.0.1:3000"; W = 390; H = 844 },
    @{ File = "desktop_menu.png"; Url = "http://127.0.0.1:3000/menu"; W = 1440; H = 1000 },
    @{ File = "mobile_menu.png"; Url = "http://127.0.0.1:3000/menu"; W = 390; H = 844 },
    @{ File = "desktop_full_page.png"; Url = "http://127.0.0.1:3000"; W = 1440; H = 3600 },
    @{ File = "mobile_full_page.png"; Url = "http://127.0.0.1:3000"; W = 390; H = 3800 },
    @{ File = "viewport_360.png"; Url = "http://127.0.0.1:3000"; W = 360; H = 800 },
    @{ File = "viewport_768.png"; Url = "http://127.0.0.1:3000"; W = 768; H = 1024 },
    @{ File = "viewport_1024.png"; Url = "http://127.0.0.1:3000"; W = 1024; H = 768 }
)

foreach ($j in $jobs) {
    $outPath = Join-Path $artDir $j.File
    $args = "--headless --disable-gpu --window-size=$($j.W),$($j.H) --screenshot=$outPath $($j.Url)"
    Start-Process -FilePath $chrome -ArgumentList $args -Wait
    Copy-Item $outPath -Destination (Join-Path $repoScreenshots $j.File) -Force
    Write-Output ("Captured: " + $j.File)
}
