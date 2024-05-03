import React, { useState, useCallback, useEffect, useContext } from 'react';
import { Page, Card, Layout, Tabs, Button, TextField, BlockStack, EmptyState, InlineError, Spinner, Modal, Link, Box, Checkbox, Divider, Scrollable, RangeSlider, Grid, InlineStack, Text, DropZone, LegacyStack, Thumbnail, ButtonGroup, Icon } from "@shopify/polaris";
import ToggleSwitch from '../ToggleButton';
import ColorPicker from '../ColorPicker';
import { IoCloseOutline } from "react-icons/io5"
import { NoteMinor, DesktopMajor, MobileMajor, SearchMajor, MobileCancelMajor } from '@shopify/polaris-icons';

const SuccessForm = ({
  successFormTitle,
  setSuccessFormTitle,
  successFormButtonText,
  setSuccessFormButtonText,
  successFormMiddleText,
  setSuccessFormMiddleText,
  successFormBtnLink,
  setSuccessFormBtnLink,
  successFormTitleColor,
  setSuccessFormTitleColor,
  successFormButtonTextColor,
  setSuccessFormButtonTextColor,
  successFormBackgroundColor,
  setSuccessFormBackgroundColor,
  successFormMiddleTextColor,
  setSuccessFormMiddleTextColor,
  successFormShowBtn,
  setSuccessFormShowBtn,
  successFormBtnColor,
  setSuccessFormBtnColor,
  successFormCloseBtnColor,
  setSuccessFormCloseBtnColor,
  successFormTitleFontSize,
  setSuccessFormTitleFontSize,
  successFormButtonFontSize,
  setSuccessFormButtonFontSize,
  successFormBtnTextWeight,
  setSuccessFormBtnTextWeight,
  successFormTitleWeight,
  setSuccessFormTitleWeight,
  successFormRadius,
  setSuccessFormRadius,
  successFormBtnRadius,
  setSuccessFormBtnRadius,
  successFormMiddleTextSize,
  setSuccessFormMiddleTextSize,
  successFormMobileViewTitleSize,
  setSuccessFormMobileViewTitleSize,
  successFormMobileViewButtonSize,
  setSuccessFormMobileViewButtonSize,
  successFormMobileViewMiddleTextSize,
  setSuccessFormMobileViewMiddleTextSize,
  discountCode,
  setDiscountCode,
  discountStatus,
  setDiscountStatus
}) => {

  const [activeView, setActiveView] = useState('desktop');
  const handleInputChange = useCallback((setter) => (newValue) => setter(newValue), []);
  const handleToggleChange = () => setSuccessFormShowBtn((prevChecked) => !prevChecked);
  const handleColorChange = useCallback((setter) => (newColor) => setter(newColor), []);

  const handleViewChange = useCallback(
    (view) => {
      if (activeView === view) return;
      setActiveView(view);
    },
    [activeView],)

  return (
    <Grid columns={{ sm: 3 }}>
      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 9, lg: 9, xl: 9 }}>
        <Card title="Sales">
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
              <div className='min-h-[500px] flex justify-center bg-[#E2E2E2] rounded-[24px] items-center'>
                <div className="relative  p-6 w-[350px] shadow-lg flex justify-center items-center text-center gap-2 flex-col"
                  style={{
                    backgroundColor: successFormBackgroundColor,
                    borderRadius: `${successFormRadius}px`
                  }}>
                  <div className='flex w-full mb-5 relative'>
                    <h1 className="font-semibold  break-words w-full max-w-[95%]"
                      style={{
                        color: successFormTitleColor,
                        fontSize: `${successFormTitleFontSize}px`,
                        fontWeight: successFormTitleWeight,
                        lineHeight: 1.1
                      }}>
                      {successFormTitle || "We thank you."}
                    </h1>
                    <IoCloseOutline className=' size-8 absolute -top-2 -right-3' style={{ color: successFormCloseBtnColor }} />
                  </div>
                  <span className='px-4 py-1 leading-7'
                    style={{
                      color: successFormMiddleTextColor,
                      fontSize: `${successFormMiddleTextSize}px`,
                      lineHeight: 1.1,
                    }}>
                    {successFormMiddleText || "The eBook has been sent to your email address, please check your email box."}
                  </span>
                  {
                    successFormShowBtn && (
                      <button className=" px-12 py-2 font-bold mt-4 mb-4"
                        style={{
                          color: successFormButtonTextColor,
                          backgroundColor: successFormBtnColor,
                          fontSize: `${successFormButtonFontSize}px`,
                          borderRadius: `${successFormBtnRadius}px`
                        }}>
                        {successFormButtonText || "Get discount Code"}
                      </button>
                    )
                  }
                </div>
              </div>
            ) : (
              <div className='flex justify-center items-center'>
                <div className='min-h-[500px] bg-[#E2E2E2] flex justify-center max-w-[260px] rounded-[24px] items-end '>
                  <div className=" p-3  shadow-lg flex justify-center w-[260px] items-center text-center gap-1 flex-col"
                    style={{ backgroundColor: successFormBackgroundColor, borderRadius: `${successFormRadius}px ${successFormRadius}px 24px 24px` }}>
                    {/* <span className='w-9 h-9 absolute top-2 right-1  flex justify-center items-center cursor-pointer text-white rounded-full'>

                    </span> */}
                    <div className='flex w-full'>


                      <p className=" text-wrap font-semibold mb-2 break-words w-full max-w-[95%]"
                        style={{
                          color: successFormTitleColor,
                          fontSize: `${successFormMobileViewTitleSize}px`,
                          lineHeight: 1.1,
                        }}>
                        {successFormTitle || "We thank you."}
                      </p>
                      <IoCloseOutline className='size-7' style={{ color: successFormCloseBtnColor }} />
                    </div>

                    <span className='px-2 py-1 text-2xl font-medium rounded-xl '
                      style={{
                        color: successFormMiddleTextColor,
                        fontSize: `${successFormMobileViewMiddleTextSize}px`,
                        lineHeight: 1.1,
                      }}>
                      {successFormMiddleText || "The eBook has been sent to your email address, please check your email box."}
                    </span>
                    {
                      successFormShowBtn && (
                        <button className="px-12 py-2 font-bold mt-2"
                          style={{
                            color: successFormButtonTextColor,
                            backgroundColor: successFormBtnColor,
                            fontSize: `${successFormMobileViewButtonSize}px`,
                            borderRadius: `${successFormBtnRadius}px`
                          }}>
                          {successFormButtonText || "Get discount Code"}
                        </button>
                      )
                    }

                  </div>
                </div>
              </div>
            )
          }


        </Card>
      </Grid.Cell>
      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 3, xl: 3 }}>
        <div className='overflow-y-auto h-[572px]'>
          <BlockStack gap="300" align='center'>
            <Card sectioned>
              <BlockStack gap="600" align='center'>
                <BlockStack gap="300">
                  <TextField label="Title" value={successFormTitle} onChange={handleInputChange(setSuccessFormTitle)} autoComplete="off" />
                  <TextField label="Middle Text" value={successFormMiddleText} onChange={handleInputChange(setSuccessFormMiddleText)} autoComplete="off" />
                  <InlineStack gap="200" align='space-between' blockAlign='center'>
                    <span>Button</span>
                    <ToggleSwitch checked={successFormShowBtn} onChange={handleToggleChange} round />
                  </InlineStack>
                  {successFormShowBtn && (
                    <>
                      <TextField label="Button Text" value={successFormButtonText} onChange={handleInputChange(setSuccessFormButtonText)} autoComplete="off" />
                      <TextField label="Button Link" value={successFormBtnLink} onChange={handleInputChange(setSuccessFormBtnLink)} autoComplete="off" />
                    </>
                  )}
                </BlockStack>
                {/* <BlockStack gap="300">
                  <InlineStack gap="200" align='space-between' blockAlign='center'>
                    <span>Discount Code</span>
                    <ToggleSwitch checked={discountStatus} onChange={() => setDiscountStatus(prevState => !prevState)} round />
                  </InlineStack>
                  {
                    discountStatus && (
                      <TextField label="Discount Code" value={discountCode} onChange={handleInputChange(setDiscountCode)} autoComplete="off" />
                    )
                  }
                </BlockStack> */}
                <BlockStack gap="300">
                  <ColorPicker value={successFormTitleColor} onChange={handleColorChange(setSuccessFormTitleColor)} label="Title" />
                  {successFormShowBtn && (
                    <>
                      <ColorPicker value={successFormBtnColor} onChange={handleColorChange(setSuccessFormBtnColor)} label="Button" />
                      <ColorPicker value={successFormButtonTextColor} onChange={handleColorChange(setSuccessFormButtonTextColor)} label="Button Text" />
                    </>
                  )}
                  <ColorPicker value={successFormBackgroundColor} onChange={handleColorChange(setSuccessFormBackgroundColor)} label="Background" />
                  <ColorPicker value={successFormMiddleTextColor} onChange={handleColorChange(setSuccessFormMiddleTextColor)} label="Middle Text" />
                  <ColorPicker value={successFormCloseBtnColor} onChange={handleColorChange(setSuccessFormCloseBtnColor)} label="Close Button" />
                </BlockStack>
                <BlockStack gap="300">
                  {
                    activeView === 'desktop' ? (
                      <>
                        <RangeSlider label="Title" value={successFormTitleFontSize} max={32} min={16} onChange={(value) => setSuccessFormTitleFontSize(value)} output />
                        <RangeSlider label="Middle Text" value={successFormMiddleTextSize} max={32} min={16} onChange={(value) => setSuccessFormMiddleTextSize(value)} output />
                        {
                          successFormShowBtn && (
                            <RangeSlider label="Button" value={successFormButtonFontSize} max={32} min={16} onChange={(value) => setSuccessFormButtonFontSize(value)} output />
                          )
                        }
                      </>
                    ) : (
                      <>
                        <RangeSlider label="Title" value={successFormMobileViewTitleSize} max={32} min={16} onChange={(value) => setSuccessFormMobileViewTitleSize(value)} output />
                        <RangeSlider label="Middle Text" value={successFormMobileViewMiddleTextSize} max={32} min={16} onChange={(value) => setSuccessFormMobileViewMiddleTextSize(value)} output />
                        {
                          successFormShowBtn && (
                            <RangeSlider label="Button" value={successFormMobileViewButtonSize} max={32} min={16} onChange={(value) => setSuccessFormMobileViewButtonSize(value)} output />
                          )
                        }
                      </>
                    )
                  }


                  {/* <RangeSlider label="Title Weight" value={successFormTitleWeight} max={900} min={100} onChange={(value) => setSuccessFormTitleWeight(value)} output /> */}
                  {/* <RangeSlider label="Button Weight" value={successFormBtnTextWeight} max={900} min={100} onChange={(value) => setSuccessFormBtnTextWeight(value)} output /> */}
                  <RangeSlider label="Popup Radius" value={successFormRadius} max={60} min={0} onChange={(value) => setSuccessFormRadius(value)} output />

                  {
                    successFormShowBtn && (
                      <RangeSlider label="Button Radius" value={successFormBtnRadius} max={25} min={0} onChange={(value) => setSuccessFormBtnRadius(value)} output />
                    )
                  }
                </BlockStack>
              </BlockStack>
            </Card>
          </BlockStack>
        </div>
      </Grid.Cell>
    </Grid>
  );
};

export default SuccessForm