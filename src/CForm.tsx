import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IFormInput, ICFormProps } from "./IFormInput";

const CForm: FC<ICFormProps> = (props) => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    props.onComplete(data);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Asset ID</label>
          <input {...register("asset_id", { required: true })} autoComplete="off" />
        </div>

        <div>
          <label>Name</label>
          <input {...register("name", { required: true })} autoComplete="off" />
        </div>

        <div>
          <label>URL Based Picture</label>
          <input {...register("picture", { required: true })} autoComplete="off" />
        </div>

        <div>
          <label>External Link</label>
          <input {...register("external_link", { required: true })} autoComplete="off" />
        </div>

        <div>
          <label>Description</label>
          <textarea {...register("description", { required: true })} autoComplete="off" />
        </div>

        <div>
          <label>Collection</label>
          <input type="number" {...register("collection", { required: true })} autoComplete="off" />
        </div>

        <div>
          <label>Supply</label>
          <input type="number" {...register("supply", { required: true })} autoComplete="off" />
        </div>

        <div>
          <label>Royalties</label>
          <input type="number" {...register("royalties", { required: true })} autoComplete="off" />
        </div>

        <div>
          <label>Date of Creation</label>
          <input {...register("date_of_creation", { required: true })} autoComplete="off" />
        </div>

        <input type="submit" value="Add" />
      </form>
    </div>
  );
};

export default CForm;
