-- CreateTable
CREATE TABLE "dia" (
    "id" SERIAL NOT NULL,
    "dia" INTEGER NOT NULL,
    "mes" INTEGER NOT NULL,
    "ano" INTEGER NOT NULL,

    CONSTRAINT "dia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dia_noiva" (
    "id" SERIAL NOT NULL,
    "id_noiva" INTEGER NOT NULL,
    "id_dia" INTEGER NOT NULL,

    CONSTRAINT "dia_noiva_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "dia_noiva" ADD CONSTRAINT "dia_noiva_id_noiva_fkey" FOREIGN KEY ("id_noiva") REFERENCES "noiva"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dia_noiva" ADD CONSTRAINT "dia_noiva_id_dia_fkey" FOREIGN KEY ("id_dia") REFERENCES "dia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
