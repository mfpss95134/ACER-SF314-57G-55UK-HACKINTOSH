# ACER-SF314-57G-55UK-HACKINTOSH

## Specifications
| Component | Details |
|:---:|:---:|
| Model | Acer SF314-57G-55UK |
| CPU | Intel Core i5-1035G1 |
| RAM | 8GB LPDDR4X 2666Mhz |
| SSD | WD SN520 512GB |
| Graphic Cards | Intel IceLake UHD Graphics<br>Nvidia GeForce MX350 |
| WiFi / BT | Intel Wireless AX201 CNVi |
| BIOS version | v1.18 |
<br>

## Supported Versions
- macOS Big Sur 11.6.5
- macOS Monterey 12.0<br>(`AirportItlwm.kext` and `IntelBluetoothInjector.kext` need to be replaced on your own.)
<br>

## Known Issues
Most parts are working well, except the following.

| Component | Status | Description |
|:---|:---|:---|
| AirDrop | Not working | Not compatible with intel wireless adapters. |
| Nvidia GeForce MX350 | Not working | Not suppoerted by macOS. |
| FingerPrint | Not working | Not suppoerted by macOS. |
| Internal Mic | Not working | The internal mic adopts the `Intel Smart Sound Technology`, which is not supported by AppleALC due to brand-new structure.<br>There is temporarily no solution for this, same as 聯想小新13. |
| Thunderbolt 3 | Partial working | This is not fully tested because I have no TB3 devices by my side. <br><br>However, there is a known phenomenon that if not rebooting from windows, the system will crash when connecting external display through TB3 port. |
| HDMI | Not tested | Not tested, but there is a high probability of not working. |
<br>

## Recommended BIOS Settings / Modifications
Incorrect modification may brick you device, please be CAREFUL when operating.
- `Secure Boot: Disabled`
  - It will be unbootable without setting this to `Disabled`.
- `Fast Boot: Disabled`
  - Sometimes, this item cause unstability.
  - You had better turn this OFF. Trust me.
- `VT-d: Disabled`
  - Dortania's guide suggests us setting this to `Disabled`.
- `SATA mode: AHCI`
  - It will be unbootable without setting this to `AHCI`.
  - Boot into BIOS and switch to Main tab.
  - Press `Ctrl + S`, then the hidden item will show up.
  - Toggle the option to `AHCI`.
- `CFG Lock: Disabled`
  - This is a hidden item in BIOS, so we need to change its corresponding value by **H2OUVE**.
  - Boot into windows and follow the instruction below.
  - Run `WDFInst.exe` as administrator first, then `H2OUVE-W-GUIx64.exe`.
  - Click on `File` -> `Load runtime` -> `Variable`, then locate to `0x43` in CpuSetup.
  - Change the default value from `0x1`(Enabled) to `0x0`(Disabled).<br><img src="https://raw.githubusercontent.com/mfpss95134/ACER-SF314-57G-55UK-HACKINTOSH/main/IMAGEs/CFG_LOCK.jpeg"  width="600">
- `Low Power S0 Idle Capability: Disabled`
  - This is item MUST be off for the sake of enabling **S3 sleep** functionality.
  - This is a hidden item in BIOS, so we need to change its corresponding value by **H2OUVE**.
  - Boot into windows and follow the instruction below.
  - Run `WDFInst.exe` as administrator first, then `H2OUVE-W-GUIx64.exe`.
  - Click on `File` -> `Load runtime` -> `Variable`, then locate to `0x28` in Setup.
  - Change the default value from `0x1`(Enabled) to `0x0`(Disabled).<br><img src="https://raw.githubusercontent.com/mfpss95134/ACER-SF314-57G-55UK-HACKINTOSH/main/IMAGEs/S0_IDLE.jpeg"  width="600">
<br>

## Screenshots
<div align="center">
<img src="https://raw.githubusercontent.com/mfpss95134/ACER-SF314-57G-55UK-HACKINTOSH/main/IMAGEs/Screenshot_01.jpg">
<img src="https://raw.githubusercontent.com/mfpss95134/ACER-SF314-57G-55UK-HACKINTOSH/main/IMAGEs/Screenshot_02.jpg">
<img src="https://raw.githubusercontent.com/mfpss95134/ACER-SF314-57G-55UK-HACKINTOSH/main/IMAGEs/Screenshot_03.jpg">
<img src="https://raw.githubusercontent.com/mfpss95134/ACER-SF314-57G-55UK-HACKINTOSH/main/IMAGEs/Screenshot_04.jpg">
<img src="https://raw.githubusercontent.com/mfpss95134/ACER-SF314-57G-55UK-HACKINTOSH/main/IMAGEs/Screenshot_05.jpg">
<img src="https://raw.githubusercontent.com/mfpss95134/ACER-SF314-57G-55UK-HACKINTOSH/main/IMAGEs/Screenshot_06.jpg">
<div align="left">
<br>

## Reference
- <https://zhuanlan.zhihu.com/p/266400995>
- <https://blog.csdn.net/weixin_42525211/article/details/112126322>
- <https://github.com/m0d16l14n1/icelake-hackintosh>
- <https://github.com/KatLantyss/Acer-Swift-IceLake-Hackintosh-OpenCore>
<br>

## Credits
- [**Apple**](https://www.apple.com/tw/) for the macOS.
- [**Dortania**](https://github.com/dortania) for the great guides.
- [**Acidanthera**](https://github.com/acidanthera) for [AppleALC](https://github.com/acidanthera/AppleALC), [Lilu](https://github.com/acidanthera/Lilu), [OpenCore](https://github.com/acidanthera/OpenCorePkg), [VoodooPS2](https://github.com/acidanthera/VoodooPS2), [VirtualSMC](https://github.com/acidanthera/VirtualSMC), [WhateverGreen](https://github.com/acidanthera/WhateverGreen)
- [**VoodooI2C Developer Team**](https://github.com/VoodooI2C) for [VoodooI2C](https://github.com/VoodooI2C/VoodooI2C)
- [**OpenIntelWireless**](https://github.com/OpenIntelWireless) for [AirportItlwm](https://github.com/OpenIntelWireless/itlwm) and [IntelBluetoothFirmware](https://github.com/OpenIntelWireless/IntelBluetoothFirmware)
- [**KatLantyss**](https://github.com/KatLantyss) for fixing bugs and testing.
