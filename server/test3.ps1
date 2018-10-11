#$files = Get-ChildItem args[0]
Param(
  [string]$serviceName,
  [string]$ComputerName
)
Write-Output $serviceName
Get-Service -name $serviceName -ComputerName $ComputerName


