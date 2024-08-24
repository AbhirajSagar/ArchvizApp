var currentOpened = '';
var walls = 0;
var openedLightProperty = '';
var isLocal = true;
const themes = [
    {
        "--menu-color": "#393E46",
        "--menu-highlighted-color": "#545961",
        "--text-color": "white",
        "--background-body": "rgb(239, 238, 238)",
        "--gradient-one": "#660bcd",
        "--gradient-two": "#9b46fc",
        "--subgradient-two": "#b88de8",
        "--icons-color": "white",
        "--menu-darker-color": "rgb(46, 46, 46)",
        "--text-hover-color" : "white"
    },
    {
        "--menu-color": "#343c33",
        "--menu-highlighted-color": "#545961",
        "--text-color": "white",
        "--background-body": "rgb(239, 238, 238)",
        "--gradient-one": "#0bcd2a",
        "--gradient-two": "#00b04f",
        "--subgradient-two": "#c8e88d",
        "--icons-color": "white",
        "--menu-darker-color": "rgb(46, 46, 46)",
        "--text-hover-color" : "white"
    },
    {
        "--menu-color": "#33373c",
        "--menu-highlighted-color": "#3a485e",
        "--text-color": "white",
        "--background-body": "rgb(239, 238, 238)",
        "--gradient-one": "#3572EF",
        "--gradient-two": "#3ABEF9",
        "--subgradient-two": "white",
        "--icons-color": "white",
        "--menu-darker-color": "rgb(46, 46, 46)",
        "--text-hover-color" : "rgb(46, 46, 46)"
    },
    {
        "--menu-color": "#2D3A45",
        "--menu-highlighted-color": "#47525C",
        "--text-color": "#FFFFFF",
        "--background-body": "#EAEAEA",
        "--gradient-one": "#D72638",
        "--gradient-two": "#FF570A",
        "--subgradient-two": "#FF9F1A",
        "--icons-color": "#FFFFFF",
        "--menu-darker-color": "#1C2A35",
        "--text-hover-color": "#FFFFFF"
    }
];

const themeIndex = localStorage.getItem('theme');
themeIndex && handleThemes(int.parseInt(themeIndex));

function closeSettings()
{
    document.getElementById("SettingsDialogBoxWindow").style.height = "0";
    document.getElementById("SettingsDialogBoxWindow").style.paddingTop = "0";
    document.getElementById("SettingsDialogBoxWindow").style.paddingBottom = "0";
    document.getElementById("SettingsDialogBoxWindow").style.border = "0";
    setTimeout(()=>{document.getElementById("SettingsWindow").style.display = "none";},500);
}
function openSettings()
{
    document.getElementById("SettingsWindow").style.display = "flex";
    setTimeout(()=>{document.getElementById("SettingsDialogBoxWindow").style.height = "65%";
    document.getElementById("SettingsDialogBoxWindow").style.paddingTop = "20px";
    document.getElementById("SettingsDialogBoxWindow").style.paddingBottom = "20px";
    document.getElementById("SettingsDialogBoxWindow").style.border = "1px solid var(--gradient-two)";},300);
}
function closeHDRI()
{
    document.getElementById("HDRIDialogBoxWindow").style.height = "0";
    document.getElementById("HDRIDialogBoxWindow").style.paddingTop = "0";
    document.getElementById("HDRIDialogBoxWindow").style.paddingBottom = "0";
    document.getElementById("HDRIDialogBoxWindow").style.border = "0";
    setTimeout(()=>{document.getElementById("HDRIWindow").style.display = "none";},500);
}
function openHDRI()
{
    document.getElementById("HDRIWindow").style.display = "flex";
    setTimeout(()=>{document.getElementById("HDRIDialogBoxWindow").style.height = "65%";
    document.getElementById("HDRIDialogBoxWindow").style.paddingTop = "20px";
    document.getElementById("HDRIDialogBoxWindow").style.paddingBottom = "20px";
    document.getElementById("HDRIDialogBoxWindow").style.border = "1px solid var(--gradient-two)";},300);
}
function SetMode(Mode)
{
    Unity.SendMessage('Manager','SetMode',Mode);
}
function loadAsset(URL)
{
    Unity.SendMessage('Manager','LoadAsset',URL);
}
function applyHDRI(URL)
{
    Unity.SendMessage('Manager','ApplyHDRI',URL);
}
function AddLights(lightType)
{
    Unity.SendMessage('Manager','AddLight',lightType);
}
function openSideBar(id)
{
    if(currentOpened == '')
    {
        const sidebar = document.getElementById(id);
        sidebar.style.width = "30%";
        sidebar.style.paddingLeft = "15px";
        sidebar.style.paddingRight = "15px";
        currentOpened = id;    
    }
    else
    {
        closeSideBar(currentOpened);
        openSideBar(id);
    }
}
function closeSideBar(id)
{
    const sidebar = document.getElementById(id);
    sidebar.style.width = "0px";
    sidebar.style.paddingLeft = "0px";
    sidebar.style.paddingRight = "0px";
    currentOpened = '';
}
function AddWalls()
{
    const WallInput = document.getElementById("WallNumberInput").value;
    const WallsInfoSection = document.getElementById("WallsInfo");
    if(WallInput > walls)
    {
        //Increment in Walls
        // Create the div element
        var divElement = document.createElement('div');
        divElement.className = 'cards';
        divElement.style.borderRadius = '10px';
        divElement.style.margin = '5px 0px';

        // Create the heading element
        var headingElement = document.createElement('h1');
        headingElement.className = 'subheadingTxt';
        headingElement.style.color = 'white';
        headingElement.style.fontWeight = '200';
        headingElement.style.margin = '10px 0px';
        headingElement.innerText = 'Wall Length ';
        var spanElement = document.createElement('span');
        spanElement.style.float = 'right';
        spanElement.style.margin = '0px 5px';
        spanElement.innerText = `${WallInput}`;
        headingElement.appendChild(spanElement);
        divElement.appendChild(headingElement);

        // Create the container for icons and input
        var containerElement = document.createElement('div');
        containerElement.style.display = 'flex';
        containerElement.style.alignItems = 'center';
        containerElement.style.justifyContent = 'center';
        containerElement.style.marginTop = '5px';
        containerElement.style.overflow = 'hidden';

        // Create the remove icon
        var removeIcon = document.createElement('span');
        removeIcon.className = 'material-symbols-outlined actionIcons';
        removeIcon.innerText = 'remove';
        removeIcon.style.borderRadius = '5px 0px 0px 5px';
        removeIcon.setAttribute('onclick', 'stepUpDown(this, -1);UpdateFloorplanMesh();');
        containerElement.appendChild(removeIcon);

        // Create the input element
        var inputElement = document.createElement('input');
        inputElement.className = 'NumberInput';
        inputElement.type = 'number';
        inputElement.min = '-100';
        inputElement.max = '100';
        inputElement.value = '1';
        inputElement.addEventListener('change',()=>{UpdateFloorplanMesh();});
        containerElement.appendChild(inputElement);

        // Create the add icon
        var addIcon = document.createElement('span');
        addIcon.className = 'material-symbols-outlined actionIcons';
        addIcon.innerText = 'add';
        addIcon.style.borderRadius = '0px 5px 5px 0px';
        addIcon.setAttribute('onclick', 'stepUpDown(this, 1);UpdateFloorplanMesh();');
        containerElement.appendChild(addIcon);

        // Append the container to the div
        divElement.appendChild(containerElement);

        // Append the div to the element with id "WallsInfo"
        document.getElementById('WallsInfo').appendChild(divElement);
        walls += 1;
    }
    else
    {
        //Decrement in Walls
        if (WallsInfoSection.children.length > 0)
        {
            WallsInfoSection.removeChild(WallsInfoSection.lastChild);
            walls -= 1;
        }
    }
}
function stepUpDown(element, step)
{
    var input = element.parentNode.querySelector('input[type="number"]');
    input.stepUp(step);
}
function toggleBuildBtn()
{
    const BuildBtn = document.getElementById("BuildBtn");
    BuildBtn.disabled = !BuildBtn.disabled; 
}
function UpdateFloorplanMesh()
{
    const WallInput = document.getElementById("WallNumberInput");
    const WallThicknessInput = document.getElementById("WallThicknessInput");
    const WallHeightInput = document.getElementById("WallHeightInput");
    var wallNumbers = WallInput.value; 
    var wallWidth = PrepareWallWidths(); 
    var wallHeight = WallHeightInput.value * 50.0; 
    var wallThickness = WallThicknessInput.value * 50.0;
    

    var data = 
    {
        wallNumbers: wallNumbers,
        wallWidth: wallWidth,
        wallHeight: wallHeight,
        wallThickness: wallThickness,
    };
    
    Unity.SendMessage('Manager','BuildFloorplan',JSON.stringify(data));
}
function updateLightingSettings()
{
    const Exposure = document.getElementById("ExposureInput");
    const Warmth = document.getElementById("WarmthInput");
    const Saturation = document.getElementById("SaturationInput");

    var data = 
    {
        Exposure: Exposure.value,
        Warmth: Warmth.value,
        Saturation : Saturation.value
    }

    //Send Data to Unity..
    Unity.SendMessage('Manager','ApplyLightOptions',JSON.stringify(data));
}
function ToggleFloor(event)
{
    event.target.classList.toggle('selected');
    Unity.SendMessage('Manager','ToggleFloor');
}
function ToggleCeiling(event)
{
    event.target.classList.toggle('selected');
    Unity.SendMessage('Manager','ToggleCeiling');
}
function ResponseChange()
{
    if(document.getElementById("realtimeUpdatesChBx").checked == true)
    {
        UpdateFloorplanMesh();
    }
}
function PrepareWallWidths()
{
    const WallsInfoSection = document.getElementById("WallsInfo");
    var cards = WallsInfoSection.querySelectorAll('.cards');
    var valuesArray = [];
    cards.forEach(function(card) 
    {
        var rangeInput = card.querySelector('input[type="number"]');
        var value = parseInt(rangeInput.value) * 50.0;
        valuesArray.push(value);
    });
    return valuesArray;
}
function OpenLightingProperties(lightType)
{
    lightType = lightType.toString();
    console.log(lightType);
    if (lightType.indexOf("(") != -1)
    {
        lightType = lightType.substring(0, lightType.indexOf('('));
    }
    if(openedLightProperty && openedLightProperty.trim())
    {
        CloseLightingProperties(openedLightProperty);
        openedLightProperty = "";
        OpenLightingProperties(lightType);
    }
    else
    {
        const lightingProperties = document.getElementById(`LightProperties${lightType}`);
        console.log(lightingProperties);
        lightingProperties.style.display = "flex";
        openedLightProperty = lightType;    
    }
}
function CloseLightingProperties()
{
    const lightingProperties = document.getElementById(`LightProperties${openedLightProperty}`);
    if(lightingProperties)
        lightingProperties.style.display = "none";
}
function SetLightingProperties(lightType)
{
    const color = document.getElementById(`LightPropertiesColor${lightType}`);
    const range = document.getElementById(`LightPropertiesRange${lightType}`);
    const spotangle = document.getElementById(`LightPropertiesSpotAngle${lightType}`);
    const intensity = document.getElementById(`LightPropertiesIntensity${lightType}`);
    const shadow = document.getElementById(`LightPropertiesShadow${lightType}`);

    var data = 
    {
        Color: color.value,
        Intensity: intensity.value,
        Shadow: shadow.value,
    };
    
    data["Range"] = range ? range.value : 999999;
    data["SpotAngle"] = spotangle ? spotangle.value : 999999;
    console.log("Data being sent to Unity " + data.Color);
    Unity.SendMessage('Manager','SetLightData',JSON.stringify(data));
}
function ToggleGrid()
{
    Unity.SendMessage('Manager','ToggleGrid');
}
function ToggleLocalGlobal()
{
    const button = document.getElementById("LocalGlobalToggle");

    if(isLocal)
    {
        button.innerHTML = `<span class="material-symbols-outlined" style = "margin-right: 5px;font-weight: 200;">
                        globe
                    </span>GLOBAL`;
        isLocal = false;
    }
    else
    {
        button.innerHTML = `<span class="material-symbols-outlined" style = "margin-right: 5px;font-weight: 200;">
                        deployed_code
                    </span>LOCAL`;
        isLocal = true;
    }

    Unity.SendMessage("Manager","ToggleLocalGlobal");
}
function ToggleSnapping(e)
{
    const button = e.target;
    button.classList.toggle("ActiveToggle");
    Unity.SendMessage("Manager","ToggleSnapping");
}
function handleThemes(event)
{
    const themeIndex = event.target.value;
    localStorage.setItem('theme',themeIndex);
    const selectedTheme = themes[themeIndex];

    const rootStyle = document.documentElement.style;

    for(const property in selectedTheme)
    {
        if (selectedTheme.hasOwnProperty(property))
        {
            rootStyle.setProperty(property, selectedTheme[property]);
        }
    }
}
function handleGraphics(event)
{
    Unity.SendMessage("Manager","SetQualityLevel",event.target.value.toString());
}
function DebugPoint()
{
    document.querySelector('.View').focus;
    Unity.SendMessage('Manager','DebugPosition');
}