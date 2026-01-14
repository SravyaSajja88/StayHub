import { FormProvider,useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection.jsx";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { useEffect } from "react";

export const ManageHotelForm = ({hotel,onSave})=>{
    const formMethods = useForm();
    const {handleSubmit,reset} = formMethods;
    useEffect(() => {
        if (hotel) {
            reset(hotel);
        }
    },[hotel,reset]);

    const onSubmit = handleSubmit((formDataJson)=>{
        const formData = new FormData();
        if (hotel) {
          formData.append("hotelId", hotel._id);
        }
        formData.append("name", formDataJson.name);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("description", formDataJson.description);
        formData.append("type", formDataJson.type);
        formData.append("pricePerNight", formDataJson.pricePerNight.toString());
        formData.append("starRating", formDataJson.starRating.toString());
        formData.append("adultCount", formDataJson.adultCount.toString());
        formData.append("childCount", formDataJson.childCount.toString());

        formDataJson.facilities.forEach((facility) => {
          formData.append("facilities", facility);
        });


        if (formDataJson.imageUrls) {
          formDataJson.imageUrls.forEach((url) => {
            formData.append("imageUrls", url);
          });
        }
        Array.from(formDataJson.imageFiles).forEach((imageFile) => {
            formData.append(`imageFiles`, imageFile);
        });

       onSave(formData);
    });

    return <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
          >

            Save
          </button>
        </span>
        
      </form>
    </FormProvider>
}
