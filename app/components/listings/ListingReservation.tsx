'use client';

import { Range } from "react-date-range";
import Button from "../Button";
import Calendar from "../inputs/Calendar";

interface ListingReservationProps {
  price: number;
  dateRange: Range,
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<
  ListingReservationProps
> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates
}) => {
  // Calcula la comisión del 10%
  const commission = totalPrice * 0.1;

  // Calcula el total (precio + comisión)
  const grandTotal = totalPrice + commission;

  return (
    <div
      className="
        bg-white
        rounded-xl
        border-[1px]
        border-neutral-200
        overflow-hidden
      "
    >
      <div className="
        flex flex-row items-center gap-1 p-4
      ">
        <div className="text-2xl font-semibold">
          $ {price}
        </div>
        <div className="font-light text-neutral-600">
          Paquete
        </div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) =>
          onChangeDate(value.selection)
        }
      />
      <hr />
      <div className="p-4">
        <Button
          disabled={disabled}
          label="Reservar"
          onClick={onSubmit}
        />
      </div>
      <hr />
      <div
        className="
          p-4
          flex
          flex-row
          items-center
          justify-between
          font-semibold
          text-lg
        "
      >
        <div>
          Precio
        </div>
        <div>
          $ {totalPrice}
        </div>
      </div>

      {/* Nueva sección para la comisión */}
      <div
        className="
          p-4
          flex
          flex-row
          items-center
          justify-between
          font-semibold
          text-lg
        "
      >
        <div>
          Servicio GaiaXplorer
        </div>
        <div>
          $ {commission.toFixed(2)}  {/* Redondea a 2 decimales */}
        </div>
      </div>
      <hr /> {/* Línea horizontal debajo de la comisión */}
      
      {/* Sección para el total (precio + comisión) */}
      <div
        className="
          p-4
          flex
          flex-row
          items-center
          justify-between
          font-semibold
          text-lg
        "
      >
        <div>
          Total
        </div>
        <div>
          $ {grandTotal.toFixed(2)}  {/* Redondea a 2 decimales */}
        </div>
      </div>
    </div>
  );
}

export default ListingReservation;