'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { 
  GiBarn, 
  GiBoatFishing, 
  GiCactus, 
  GiCastle, 
  GiCaveEntrance, 
  GiForestCamp, 
  GiIsland,
  GiWindmill
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow, BsFillTreeFill } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';

import CategoryBox from "../CategoryBox";
import Container from '../Container';


export const categories = [
  {
    label: 'Playa',
    icon: TbBeach,
    description: '¡Este paquete te llevará a la playa!',
  },
  {
    label: 'Molinos',
    icon: GiWindmill,
    description: '¡Este paquete te llevará a un molino',
  },
  {
    label: 'Moderno',
    icon: MdOutlineVilla,
    description: '¡Este paquete te brindará las experiencias más modernas'
  },
  {
    label: 'Campo',
    icon: TbMountain,
    description: '¡Este paquete te llevará al campo'
  },
  {
    label: 'Piscinas',
    icon: TbPool,
    description: '¡Este paquete contiene piscinas!'
  },
  {
    label: 'Islas',
    icon: GiIsland,
    description: '¡Este paquete te llevará a una isla'
  },
  {
    label: 'Lagos',
    icon: GiBoatFishing,
    description: '¡Este paquete te llevará a un lago!'
  },
  {
    label: 'Esquí',
    icon: FaSkiing,
    description: '¡Este paquete tiene actividades de esquí!'
  },
  {
    label: 'Castillos',
    icon: GiCastle,
    description: '¡Este paquete te llevará a visitar un antiguo castillo!'
  },
  {
    label: 'Cuevas',
    icon: GiCaveEntrance,
    description: '¡Este paquete te llevará a una cueva espeluznante!'
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'Este paquete ofrece actividades de camping.'
  },
  {
    label: 'Ártico',
    icon: BsSnow,
    description: 'Este paquete te llavará a un entorno ártico.'
  },
  {
    label: 'Desierto',
    icon: GiCactus,
    description: '¡Este paquete contiene visitas al desierto!'
  },
  {
    label: 'Selva',
    icon: BsFillTreeFill,
    description: '¡Este paquete contiene visitas a la selva!'
  },
  {
    label: 'Lujoso',
    icon: IoDiamond,
    description: '¡Este paquete es totalmente nueva y lujosa!'
  }
]

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox 
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
}
 
export default Categories;