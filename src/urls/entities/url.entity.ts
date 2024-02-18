import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Url {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    longUrl: string;

    @Column()
    token: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => Click, (click) => click.url)
    clicks: Click[]
}

@Entity()
export class Click {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Url, (url) => url.clicks)
    url: Url

    @Column()
    isMobile: boolean;
}