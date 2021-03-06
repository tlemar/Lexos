Add-Type -AssemblyName System.IO.Compression.FileSystem
function Expand-ZIPFile($file, $destination) {
    $shell = new-object -com shell.application
    $zip = $shell.NameSpace($file)
    foreach($item in $zip.items()) {
        $shell.Namespace($destination).copyhere($item)
    }
}
$curLocation = Get-Location

# downloading lexos
Write-Host ' '
Write-Host 'downloading lexos' -ForegroundColor Green
$lexosUrl = 'https://github.com/WheatonCS/Lexos/archive/master.zip'
Invoke-WebRequest $lexosUrl -OutFile 'master.zip'


# installing lexos
Write-Host ' '
Write-Host 'extracting Lexos to C:\' -ForegroundColor Green
if(Test-Path 'C:\Lexos-master'){
    Write-Host 'you already have lexos installed'
    Remove-Item C:\Lexos-master -Recurse -Force -Confirm:$false
    Expand-ZIPFile -file "$curLocation\master.zip" -destination "C:\"
    Write-Host 'your lexos is updated'
}
else {
    Write-Host "you don't seems to have lexos installed"
    Unzip "$curLocation\master.zip" "C:\"
    Write-Host "we have successfully installed lexos for you."
}

# clean up
Remove-Item -Force -Confirm:$false 'master.zip'

Write-Host 'we have cleaned up' -ForegroundColor Green
Read-Host 'you can press enter to close this windows now'