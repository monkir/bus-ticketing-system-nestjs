import { busownerEntity } from "src/busowner/busowner.entity";
import { customerEntity } from "src/customer/customer.entity";
import { posterEntity } from "src/others/poster.entity";
import { Column, Entity, IsNull, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class employeeEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column({unique: true})
    phone: string;

    @Column()
    address: string;

    @Column({default: 'none' })
    filename: string;

    @OneToMany(()=>customerEntity, (customerEntity)=>customerEntity.employee)
    customers: customerEntity[];

    @OneToMany(()=>busownerEntity, (busownerEntity)=>busownerEntity.employee)
    busowners: busownerEntity[];
    
    // @Column({default: null})
    @OneToMany(()=>posterEntity, (posterEntity)=>posterEntity.employee)
    posters: posterEntity[];
}
