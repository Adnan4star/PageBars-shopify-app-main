import React, { useState, useCallback, useEffect, useContext } from 'react';
import { Page, Card, Layout, Tabs, Button, TextField, BlockStack, RangeSlider, Grid, InlineStack, Text, DropZone, LegacyStack, Thumbnail, ButtonGroup, Icon } from "@shopify/polaris";
import ToggleSwitch from '../ToggleButton';
import ColorPicker from '../ColorPicker';
import { IoCloseOutline } from "react-icons/io5"
import { NoteMinor, DesktopMajor, MobileMajor, SearchMajor, MobileCancelMajor, DeleteMinor } from '@shopify/polaris-icons';



const FormContent = ({ onFormSectionChange, formTitle,
    setFormTitle,
    formSubtitle,
    setFormSubtitle,
    formPrimaryBtnText,
    setFormPrimaryBtnText,
    // formPrimaryBtnLink,
    // setFormPrimaryBtnLink,
    // formSecondaryBtnText,
    // setFormSecondaryBtnText,
    // formSecondaryBtnLink,
    // setFormSecondaryBtnLink,
    formWarningText,
    setFormWarningText,
    formFile,
    setFormFile,
    formDesktopFile,
    setFormDesktopFile,
    formMobileFile,
    setFormMobileFile,
    formSection,
    setFormSection,
    formName,
    setFormName,
    formEmail,
    setFormEmail,
    formPhone,
    setFormPhone,
    formTitleColor,
    setFormTitleColor,
    formSubtitleColor,
    setFormSubtitleColor,
    formBtnColor,
    setFormBtnColor,
    formBtnTextColor,
    setFormBtnTextColor,
    formRejectTextColor,
    setFormRejectTextColor,
    formBgColor,
    setFormBgColor,
    formCloseBtnColor,
    setFormCloseBtnColor,
    formTitleSize,
    setFormTitleSize,
    // formTitleWeight,
    // setFormTitleWeight,
    formSubtitleSize,
    setFormSubtitleSize,
    formSubtitleWeight,
    setFormSubtitleWeight,
    formButtonTextSize,
    setFormButtonTextSize,
    formButtonTextWeight,
    handleDropZoneDrop,
    handleDropZoneDropMobile,
    // formDiscountCode,
    // setFormDiscountCode,
    // formDiscount,
    // setFormDiscount,
    // setFormSecondaryBtnTextColor,
    // setFormSecondaryBtnColor,
    // formSecondaryBtnTextColor,
    // formSecondaryBtnColor,
    // isInvalidDiscountCode,
    // isInvalidDiscount,
    // setFormButtonTextWeight,
    formRadius,
    setFormRadius,
    formBtnRadius,
    setFormBtnRadius,
    formFieldsRadius,
    setFormFieldsRadius,
    formFieldsColor,
    setFormFieldsColor,
    formMobileViewTitleSize,
    setFormMobileViewTitleSize,
    formMobileViewSubtitleSize,
    setFormMobileViewSubtitleSize,
    formMobileViewButtonTextSize,
    setFormMobileViewButtonTextSize
}) => {
    const [activeView, setActiveView] = useState('desktop');
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    const textFieldID = 'ruleContent';
    const fileUpload = !formDesktopFile && <DropZone.FileUpload />;
    const uploadedFile = formDesktopFile && (
        <LegacyStack>
            <Thumbnail
                size="small"
                alt={formDesktopFile.name}
                source={validImageTypes.includes(formDesktopFile.type) ? window.URL.createObjectURL(formDesktopFile) : NoteMinor}
            />
        </LegacyStack>
    );
    const fileUploadMobile = !formMobileFile && <DropZone.FileUpload />;
    const uploadedFileMobile = formMobileFile && (
        <LegacyStack>
            <Thumbnail
                size="small"
                alt={formMobileFile.name}
                source={validImageTypes.includes(formMobileFile.type) ? window.URL.createObjectURL(formMobileFile) : NoteMinor}
            />
        </LegacyStack>
    );

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
                            formSection && (
                                <div className='min-h-[500px] max-h-[500px]  bg-[#E2E2E2] flex justify-center rounded-[24px] items-center'>
                                    <div className='flex '>
                                        {formDesktopFile && <img className='max-w-[270px]' src={validImageTypes?.includes(formDesktopFile?.type) ? window.URL.createObjectURL(formDesktopFile) : NoteMinor} alt="image" style={{ borderRadius: `${formRadius}px 0px 0px ${formRadius}px` }} />}
                                        <div className="relative  p-5 w-[350px] shadow-lg flex justify-center items-center text-center gap-1 flex-col" style={{ backgroundColor: formBgColor, borderRadius: formDesktopFile ? `0px ${formRadius}px ${formRadius}px 0px` : `${formRadius}px` }}>
                                            {/* <span className='w-9 h-9 absolute top-2 right-1 flex justify-center items-center cursor-pointer rounded-full' style={{ backgroundColor: formCloseBtnColor }}>
                        <ImCross className='w-4 h-4' />
                      </span> */}
                                            <div className='flex w-full relative '>
                                                <p className="text-gray-600 mb-1 font-semibold w-full max-w-[95%]" style={{ color: formTitleColor, fontSize: `${formTitleSize}px`, lineHeight: 1.2 }}>
                                                    {formTitle || "Fill in your information to get the eBook."}
                                                </p>
                                                <IoCloseOutline className=' size-8 absolute top-0 -right-3' style={{ color: formCloseBtnColor }} />
                                            </div>
                                            <p className="text-gray-600 text-xl font-normal mb-1 max-w-[90%]" style={{ color: formSubtitleColor, fontSize: `${formSubtitleSize}px` }}>
                                                {formSubtitle || "Make sure the information is correct.');"}
                                            </p>
                                            {/* {formFile && <img className='max-w-[80%]' src={validImageTypes?.includes(formFile?.type) ? window.URL.createObjectURL(formFile) : NoteMinor} alt="image" />} */}
                                            {
                                                formName &&
                                                <input
                                                    type="text"
                                                    className=" placeholder:opacity-50 text-lg placeholder-black max-w-full focus:outline-none  block w-full p-1.5"
                                                    style={{ borderRadius: formFieldsRadius, backgroundColor: formFieldsColor }}
                                                    placeholder="Name"
                                                    disabled
                                                    required />
                                            }
                                            {formEmail && <input type="text" className="  placeholder:opacity-50 text-lg placeholder-black max-w-full focus:outline-none  block w-full p-1.5" style={{ borderRadius: formFieldsRadius, backgroundColor: formFieldsColor }} placeholder="Email" required disabled />}
                                            {formPhone && <input type="text" className=" placeholder:opacity-50 text-lg placeholder-black max-w-full focus:outline-none  block w-full p-1.5" style={{ borderRadius: formFieldsRadius, backgroundColor: formFieldsColor }} placeholder="Phone" required disabled />}
                                            <button href='#' className="bg-black text-white px-12 py-1 text-2xl font-bold my-2" style={{ backgroundColor: formBtnColor, color: formBtnTextColor, borderRadius: `${formBtnRadius}px`, fontSize: `${formButtonTextSize}px` }}>
                                                {formPrimaryBtnText || "Submit"}
                                            </button>
                                            {/* <a className='text-2xl font-bold underline' style={{ color: formRejectTextColor, fontSize: formButtonTextSize, fontWeight: formButtonTextWeight }} href='#'>
                        {formSecondaryBtnText || "No, thanks"}
                      </a> */}
                                            <span className='text-white text-[11px] leading-4'>{formWarningText || "By signing up, you agree to receive marketing emails. View our privacy policy and terms of service for more info."}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        ) : (
                            <div className='flex justify-center items-center'>
                                <div className='min-h-[500px] bg-[#E2E2E2] flex justify-center max-w-[260px] rounded-[24px] items-end '>
                                    <div className='flex flex-col'>

                                        {formMobileFile && (
                                            <div className="relative">
                                                <img
                                                    className="max-w-[260px] w-full h-24"
                                                    src={validImageTypes?.includes(formMobileFile?.type) ? window.URL.createObjectURL(formMobileFile) : NoteMinor}
                                                    alt="image"
                                                    style={{ borderRadius: `${formRadius}px ${formRadius}px 0px 0px` }}
                                                />
                                                <div className="absolute top-0 right-0">
                                                    <IoCloseOutline className="size-5 m-4" style={{ color: formCloseBtnColor }} />
                                                </div>
                                            </div>
                                        )}

                                        <div className="relative p-3 w-[260px] shadow-lg flex justify-center items-center text-center gap-1 flex-col"
                                            style={{ backgroundColor: formBgColor, borderRadius: formMobileFile ? `0px 0px 24px 24px` : `${formRadius}px ${formRadius}px 24px 24px` }}>

                                            {/* <span className='w-9 h-9 absolute top-2 right-1 flex justify-center items-center cursor-pointer rounded-full' style={{ backgroundColor: formCloseBtnColor }}>
                        <ImCross className='w-4 h-4' />
                        </span> */}
                                            {
                                                !formMobileFile && (
                                                    <div className='flex w-full'>
                                                        <p className="text-gray-600 mb-2 w-full max-w-[95%]" style={{ color: formTitleColor, fontSize: `${formMobileViewTitleSize}px`, lineHeight: 1.2 }}>
                                                            {formTitle || "Fill in your information to get the eBook."}
                                                        </p>
                                                        <IoCloseOutline className='size-7' style={{ color: formCloseBtnColor }} />
                                                    </div>
                                                )
                                            }
                                            {
                                                formMobileFile && (

                                                    <p className="text-gray-600 mb-2  max-w-[90%]" style={{ color: formTitleColor, fontSize: `${formMobileViewTitleSize}px`, lineHeight: 1.2 }}>
                                                        {formTitle || "Fill in your information to get the eBook."}
                                                    </p>
                                                )
                                            }
                                            <p className="text-gray-600 font-bold mb-2 max-w-[90%]" style={{ color: formSubtitleColor, fontSize: `${formMobileViewSubtitleSize}px`, fontWeight: formSubtitleWeight }}>
                                                {formSubtitle || "Subtitle will be here"}
                                            </p>
                                            {/* {formFile && <img className='max-w-[80%]' src={validImageTypes?.includes(formFile?.type) ? window.URL.createObjectURL(formFile) : NoteMinor} alt="image" />} */}
                                            {formName && <input type="text" className=" text-sm placeholder-black focus:outline-none block w-full p-1.5 placeholder:opacity-50" style={{ borderRadius: `${formFieldsRadius}px`, backgroundColor: formFieldsColor }} placeholder="Name" required disabled />}
                                            {formEmail && <input type="text" className=" text-sm placeholder-black focus:outline-none block w-full p-1.5 placeholder:opacity-50" style={{ borderRadius: `${formFieldsRadius}px`, backgroundColor: formFieldsColor }} placeholder="Email" required disabled />}
                                            {formPhone && <input type="text" className=" text-sm placeholder-black focus:outline-none block w-full p-1.5 placeholder:opacity-50" style={{ borderRadius: `${formFieldsRadius}px`, backgroundColor: formFieldsColor }} placeholder="Phone" required disabled />}
                                            <button href='#' className="bg-black text-white px-12 py-1 text-2xl font-bold mt-3 mb-1" style={{ backgroundColor: formBtnColor, color: formBtnTextColor, fontSize: `${formMobileViewButtonTextSize}px`, borderRadius: `${formBtnRadius}px` }}>
                                                {formPrimaryBtnText || "Submit"}
                                            </button>
                                            {/* <a className='text-2xl font-bold underline' style={{ color: formRejectTextColor, fontSize: formButtonTextSize, fontWeight: formButtonTextWeight }} href='#'>
                        {formSecondaryBtnText || "No, thanks"}
                      </a> */}
                                            <span className='text-white text-[8px] leading-[12px] font-normal'>{formWarningText || "Warning text here"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </Card>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 3, xl: 3 }}>
                <div className='overflow-y-auto h-[572px]'>
                    <BlockStack gap="500" align='center'>
                        {formSection && (
                            <>
                                <Card sectioned>
                                    <BlockStack gap="600" align='center'>
                                        <BlockStack gap="300" >
                                            <InlineStack gap="200" align='space-between'>
                                                <Text variant="bodyMd" as="p">
                                                    Name
                                                </Text>
                                                <ToggleSwitch checked={formName} onChange={() => setFormName(prevState => !prevState)} round />
                                            </InlineStack>
                                            <InlineStack gap="200" align='space-between'>
                                                <Text variant="bodyMd" as="p">
                                                    Email
                                                </Text>
                                                <ToggleSwitch checked={formEmail} onChange={() => setFormEmail(prevState => !prevState)} round />
                                            </InlineStack>
                                            <InlineStack gap="200" align='space-between'>
                                                <Text variant="bodyMd" as="p">
                                                    Phone
                                                </Text>
                                                <ToggleSwitch checked={formPhone} onChange={() => setFormPhone(prevState => !prevState)} round />

                                            </InlineStack>
                                            {
                                                activeView === "mobile" && (
                                                    <BlockStack gap="300" align='center'>
                                                        <InlineStack gap="200" align='space-between' blockAlign='center'>
                                                            <span>Image</span>
                                                            <div className='w-10 h-10'>
                                                                <DropZone allowMultiple={false} onDrop={handleDropZoneDropMobile}>
                                                                    {uploadedFileMobile}
                                                                    {fileUploadMobile}
                                                                </DropZone>
                                                            </div>
                                                        </InlineStack>
                                                        {
                                                            formMobileFile && (
                                                                <Button size="slim" onClick={() => setFormMobileFile(null)} icon={DeleteMinor} >Remove Image</Button>
                                                            )
                                                        }
                                                    </BlockStack>
                                                )
                                            }
                                            {
                                                activeView === "desktop" && (
                                                    <BlockStack gap="300" align='center'>
                                                        <InlineStack gap="200" align='space-between' blockAlign='center'>
                                                            <span>Image</span>
                                                            <div className='w-10 h-10'>
                                                                <DropZone allowMultiple={false} onDrop={handleDropZoneDrop}>
                                                                    {uploadedFile}
                                                                    {fileUpload}
                                                                </DropZone>
                                                            </div>
                                                        </InlineStack>
                                                        {
                                                            formDesktopFile && (
                                                                <Button size="slim" onClick={() => setFormDesktopFile(null)} icon={DeleteMinor} >Remove Image</Button>
                                                            )
                                                        }
                                                    </BlockStack>
                                                )
                                            }

                                            {
                                                formFile && (
                                                    <Button size="slim" onClick={() => setFormFile(null)} icon={DeleteMinor} >Remove Image</Button>
                                                )
                                            }
                                            <TextField
                                                label="Title"
                                                value={formTitle}
                                                onChange={(value) => setFormTitle(value)}
                                                autoComplete="off"
                                            />

                                            <TextField
                                                label="Subtitle"
                                                value={formSubtitle}
                                                onChange={(value) => setFormSubtitle(value)}
                                                autoComplete="off"
                                            />

                                            <TextField
                                                label="Primary Button Text"
                                                value={formPrimaryBtnText}
                                                onChange={(value) => setFormPrimaryBtnText(value)}
                                                autoComplete="off"
                                            />

                                            {/* <TextField
                        label="Primary Button Link"
                        value={formPrimaryBtnLink}
                        onChange={(value) => setFormPrimaryBtnLink(value)}
                        autoComplete="off"
                      /> */}

                                            {/* <TextField
                        label="Discount Code"
                        value={formDiscountCode}
                        onChange={(value) => setFormDiscountCode(value)}
                        // error={isInvalidDiscountCode}
                        helpText="This field is required"
                        autoComplete="off"
                      /> */}
                                            {/* {
                        isInvalidDiscountCode && (
                          <InlineError message="This fiedl is required" fieldID={textFieldID} />
  
                        )
                      } */}
                                            {/* <TextField
                        label="Discount"
                        type='number'
                        value={formDiscount}
                        onChange={(value) => setFormDiscount(value)}
                        // error={isInvalidDiscount}
                        autoComplete="off"
                        helpText="This field is required"
                      /> */}
                                            {/* {
                        isInvalidDiscount && (
                          <InlineError message="This fiedl is required" fieldID={textFieldID} />
                        )
                      } */}

                                            {/* <TextField
                        label="Secondary Button Text"
                        value={formSecondaryBtnText}
                        onChange={(value) => setFormSecondaryBtnText(value)}
                        autoComplete="off"
                      />
  
                      <TextField
                        label="Secondary Button Link"
                        value={formSecondaryBtnLink}
                        onChange={(value) => setFormSecondaryBtnLink(value)}
                        autoComplete="off"
                      /> */}

                                            <TextField
                                                label="Warning Text"
                                                value={formWarningText}
                                                onChange={(value) => setFormWarningText(value)}
                                                autoComplete="off"
                                            />
                                        </BlockStack>
                                        <BlockStack gap="300" >
                                            <ColorPicker value={formTitleColor} onChange={color => setFormTitleColor(color)} label="Title" />
                                            <ColorPicker value={formSubtitleColor} onChange={color => setFormSubtitleColor(color)} label="Subtitle" />
                                            <ColorPicker value={formBtnColor} onChange={color => setFormBtnColor(color)} label="Button" />
                                            <ColorPicker value={formBtnTextColor} onChange={color => setFormBtnTextColor(color)} label="Button Text" />
                                            <ColorPicker value={formFieldsColor} onChange={color => setFormFieldsColor(color)} label="Fields Color" />
                                            {/* <ColorPicker value={formSecondaryBtnColor} onChange={color => setFormSecondaryBtnColor(color)} label="Secondary Button" /> */}
                                            {/* <ColorPicker value={formSecondaryBtnTextColor} onChange={color => setFormSecondaryBtnTextColor(color)} label="Secondary Button Text" /> */}
                                            {/* <ColorPicker value={formRejectTextColor} onChange={color => setFormRejectTextColor(color)} label="Reject Text" /> */}
                                            <ColorPicker value={formBgColor} onChange={color => setFormBgColor(color)} label="Background" />
                                            <ColorPicker value={formCloseBtnColor} onChange={color => setFormCloseBtnColor(color)} label="Close Button" />
                                        </BlockStack>
                                        <BlockStack gap="300">
                                            {
                                                activeView == 'desktop' ? (
                                                    <>
                                                        <RangeSlider label="Title Text" value={formTitleSize} max={32} min={16} onChange={value => setFormTitleSize(value)} output />
                                                        {/* <RangeSlider output label="Tittle weight" min={100} max={800} step={100} value={formTitleWeight} onChange={value => setFormTitleWeight(value)} /> */}
                                                        <RangeSlider label="Subtitle Text " value={formSubtitleSize} max={28} min={16} onChange={value => setFormSubtitleSize(value)} output />
                                                        {/* <RangeSlider output label="Subtitle weight" min={100} max={800} step={100} value={formSubtitleWeight} onChange={value => setFormSubtitleWeight(value)} /> */}
                                                        <RangeSlider label="Button Text" value={formButtonTextSize} max={32} min={16} onChange={value => setFormButtonTextSize(value)} output />
                                                        {/* <RangeSlider output label="Button Text weight" min={100} max={800} step={100} value={formButtonTextWeight} onChange={value => setFormButtonTextWeight(value)} /> */}
                                                    </>
                                                ) : (
                                                    <>
                                                        <RangeSlider label="Title Text" value={formMobileViewTitleSize} max={32} min={8} onChange={value => setFormMobileViewTitleSize(value)} output />
                                                        <RangeSlider label="Subtitle Text " value={formMobileViewSubtitleSize} max={32} min={8} onChange={value => setFormMobileViewSubtitleSize(value)} output />
                                                        <RangeSlider label="Button Text" value={formMobileViewButtonTextSize} max={32} min={8} onChange={value => setFormMobileViewButtonTextSize(value)} output />
                                                    </>
                                                )
                                            }

                                            <RangeSlider label="Popup Radius" value={formRadius} max={60} min={0} onChange={value => setFormRadius(value)} output />
                                            <RangeSlider label="Button Radius" value={formBtnRadius} max={25} min={0} onChange={value => setFormBtnRadius(value)} output />
                                            <RangeSlider label="Fields Radius" value={formFieldsRadius} max={25} min={0} onChange={value => setFormFieldsRadius(value)} output />
                                        </BlockStack>
                                    </BlockStack>
                                </Card>
                            </>
                        )}
                    </BlockStack>
                </div>
            </Grid.Cell>

        </Grid >
    );
};

export default FormContent