-- CreateTable
CREATE TABLE "noiva" (
    "id" SERIAL NOT NULL,
    "cpf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "foto" TEXT[],

    CONSTRAINT "noiva_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "noiva_cpf_key" ON "noiva"("cpf");
