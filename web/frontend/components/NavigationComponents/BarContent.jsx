import React, { useState, useCallback, useEffect, useContext } from 'react';
import { Page, Card, Layout, Tabs, Button, TextField, BlockStack, RangeSlider, Grid, InlineStack, DropZone, LegacyStack, Thumbnail, ButtonGroup } from "@shopify/polaris";
// import ToggleSwitch from './ToggleButton';
import ColorPicker from '../ColorPicker';
import { IoCloseOutline } from "react-icons/io5"
import { NoteMinor, DesktopMajor, MobileMajor, SearchMajor, MobileCancelMajor, DeleteMinor } from '@shopify/polaris-icons';
import eBook from '../../assets/eBook.svg';


function BarContent({
  title,
  scroll,
  btnText,
  btnLink,
  showBtn,
  titleColor,
  barColor,
  btnColor,
  btnTextColor,
  closeBtnColor,
  titleSize,
  titleWeight,
  buttonTextSize,
  buttonTextWeight,
  activeView,
  handleColorChange,
  handleSliderChange,
  handleStepedSliderChange,
  handleInputChange,
  handleToggleChange,
  setTitleColor,
  setBarColor,
  setBtnColor,
  setBtnTextColor,
  setCloseBtnColor,
  setTitleSize,
  setTitleWeight,
  setButtonTextSize,
  setButtonTextWeight,
  setActiveView,
  setTitle,
  setScroll,
  setBtnText,
  setBtnLink,
  setShowBtn,
  barFile,
  setBarFile,
  handleBarDropZone,
  btnRadius,
  setBtnRadius,
  mobileViewTitleSize,
  setMobileViewTitleSize,
  mobileViewBtnTextSize,
  setMobileViewBtnTextSize,
}) {
  // const eBookUrl = '../../assets/eBook.svg'; 
  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
  const textFieldID = 'ruleContent';
  const fileUpload = !barFile && <DropZone.FileUpload />;
  const uploadedFile = barFile && (
    <LegacyStack>
      <Thumbnail
        size="small"
        alt={barFile.name}
        source={
          barFile ?
            (typeof barFile === 'string' ?
              barFile :
              validImageTypes.includes(barFile.type) ?
                window.URL.createObjectURL(barFile) :
                NoteMinor
            ) :
            NoteMinor // Fallback image when barFile is not available
        }
      />

    </LegacyStack>
  );

  const handleViewChange = useCallback(
    (view) => {
      if (activeView === view) return;
      setActiveView(view);
    },
    [activeView],
  );

  useEffect(() => {
    console.log("bar file == ", barFile)
  }, []);

  const renderImageSource = (file) => {
    return validImageTypes.includes(file.type) ? window.URL.createObjectURL(file) : NoteMinor;
  }

  return (
    <Grid columns={{ sm: 2 }}>
      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 9, lg: 9, xl: 9 }}>
        <Card title="Sales"  >
          <div className='flex justify-center items-center mb-3'>
            <ButtonGroup variant="segmented">
              <Button
                pressed={activeView === "desktop"}
                onClick={() => handleViewChange("desktop")}
                icon={DesktopMajor}
                size='Slim'

              >
              </Button>
              <Button
                pressed={activeView === "mobile"}
                onClick={() => handleViewChange("mobile")}
                icon={MobileMajor}
                size='Slim'
              >
              </Button>
            </ButtonGroup>
          </div>
          {
            activeView === "desktop" ? (
              <div style={{ minHeight: '500px' }} className='relative bg-[#E2E2E2] rounded-2xl'>
                {/* <div className="absolute left-1/2 top-0 z-10 h-4 w-28 -translate-x-1/2 rounded-b-xl bg-stone-950">
                    <div className="absolute left-1/2 top-1 h-1 w-7 -translate-x-1/2 rounded-full  bg-stone-500"></div>
                    <div className="absolute right-6 top-0 h-2.5 w-2.5 rounded-full border-2 border-stone-800 bg-stone-900"></div>
                  </div> */}
                <div className="w-full absolute rounded-b-2xl  bottom-0 left-0 px-2 py-1" style={{ backgroundColor: barColor }}>
                  <div className={`flex ${showBtn ? 'justify-between' : 'justify-around'} items-center `}>
                    <span className='w-7 h-7 flex justify-center items-center rounded-full'>
                      <IoCloseOutline className='size-7' style={{ color: closeBtnColor }} />
                    </span>
                    {barFile && (
                      typeof barFile === 'string' ?
                        <img className="-mt-8 size-16" src={barFile} alt="Uploaded eBook" /> :
                        <img className="-mt-8 size-16" src={renderImageSource(barFile)} alt="bar image" />
                    )}
                    <h4 className='font-bold min-w-[360px] max-w-[360px] text-2xl'
                      style={{ color: titleColor, fontWeight: titleWeight, fontSize: `${titleSize}px` }}>
                      {title || 'Would you like to Get this ebook for free?'}
                    </h4>
                    {
                      showBtn && (
                        <button href={btnLink}
                          style={{
                            backgroundColor: btnColor,
                            fontSize: `${buttonTextSize}px`,
                            color: btnTextColor,
                            borderRadius: `${btnRadius}px`
                          }} className='px-14 mr-20 text-xl font-bold max-w-[250px]'>
                          {btnText || 'Get eBook?'}
                        </button>
                      )
                    }

                  </div>
                </div>
              </div>
            ) : (
              <div style={{ minHeight: '500px' }} className='relative bg-[#E2E2E2] max-w-[260px] mx-auto rounded-[24px] '>
                <div className='w-full absolute bottom-0 left-0'>
                  <BlockStack >
                    <div className=" px-3 py-0.5" style={{ backgroundColor: barColor }}>
                      <div className='flex relative py-1 w-full'>
                        <IoCloseOutline className='size-5 absolute top-1 -left-2'
                          style={{ color: closeBtnColor }} />
                        <h4 className='font-medium text-wrap text-center ml-4 justify-end w-full'
                          style={{ color: titleColor, fontSize: `${mobileViewTitleSize}px` }}>
                          {title || 'Would you like to Get this ebook for free?'}
                        </h4>
                      </div>
                    </div>
                    {
                      showBtn && (
                        <button href={btnLink}
                          style={{
                            backgroundColor: btnColor,
                            fontSize: `${mobileViewBtnTextSize}px`,
                            color: btnTextColor,
                          }} className='px-10 w-full py-1 text-xl rounded-b-3xl font-bold'>
                          {btnText || 'Get?'}
                        </button>
                      )
                    }
                  </BlockStack>
                </div>
              </div>
            )
          }

        </Card>
      </Grid.Cell>
      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 3, xl: 3 }}>
        <div className='h-[572px] overflow-y-auto'>
          <Card sectioned>
            <BlockStack gap="600" align='center'>
              <BlockStack gap="300">
                <InlineStack gap="200" align='space-between' blockAlign='center'>
                  <span>Image</span>
                  <div className='w-10 h-10'>
                    <DropZone allowMultiple={false} onDrop={handleBarDropZone}>
                      {uploadedFile}
                      {fileUpload}
                    </DropZone>
                  </div>
                </InlineStack>
                {
                  barFile && (
                    <Button icon={DeleteMinor} onClick={() => setBarFile(null)} >Remove Image</Button>
                  )
                }
                <TextField label="Title" value={title} onChange={handleInputChange(setTitle)} autoComplete="off" />
                <TextField label="Scroll %" value={scroll} onChange={handleInputChange(setScroll)} autoComplete="off" />
                {/* <InlineStack gap="200" align='space-between'>
                    <span>Button</span>
                    <ToggleSwitch checked={showBtn} onChange={handleToggleChange} round />
                  </InlineStack> */}
                {
                  showBtn && (
                    <>
                      <TextField label="Button Text" value={btnText} onChange={handleInputChange(setBtnText)} autoComplete="off" />
                      {/* <TextField label="Button Link" value={btnLink} onChange={handleInputChange(setBtnLink)} autoComplete="off" /> */}
                    </>
                  )
                }
              </BlockStack>
              <BlockStack gap="300">
                <ColorPicker value={titleColor} onChange={handleColorChange(setTitleColor)} label="Title" />
                <ColorPicker value={barColor} onChange={handleColorChange(setBarColor)} label="Bar" />
                {
                  showBtn && (
                    <>
                      <ColorPicker value={btnColor} onChange={handleColorChange(setBtnColor)} label="Button" />
                      <ColorPicker value={btnTextColor} onChange={handleColorChange(setBtnTextColor)} label="Button Text" />
                    </>
                  )
                }
                <ColorPicker value={closeBtnColor} onChange={handleColorChange(setCloseBtnColor)} label="Close Button" />
              </BlockStack>
              <BlockStack gap="300">
                {
                  activeView == 'desktop' ? (
                    <>
                      <RangeSlider label="Title Text" value={titleSize} max={32} min={16} onChange={handleSliderChange(setTitleSize)} output />
                      {/* <RangeSlider output label="Tittle weight" min={100} max={800} step={100} value={titleWeight} onChange={handleStepedSliderChange(setTitleWeight)} /> */}

                      <RangeSlider label="Button Text" value={buttonTextSize} max={26} min={16} onChange={handleSliderChange(setButtonTextSize)} output />
                      {/* <RangeSlider output label="Button Text weight" min={100} max={800} step={100} value={buttonTextWeight} onChange={handleStepedSliderChange(setButtonTextWeight)} /> */}

                      <RangeSlider label="Button Radius" value={btnRadius} max={24} min={0} onChange={handleSliderChange(setBtnRadius)} output />
                    </>
                  ) : (
                    <>
                      <RangeSlider label="Title Text" value={mobileViewTitleSize} max={20} min={8} onChange={handleSliderChange(setMobileViewTitleSize)} output />
                      <RangeSlider label="Button Text" value={mobileViewBtnTextSize} max={20} min={8} onChange={handleSliderChange(setMobileViewBtnTextSize)} output />
                    </>
                  )
                }
              </BlockStack>
            </BlockStack>
          </Card>
        </div>
      </Grid.Cell>
    </Grid >
  );
};

export default BarContent