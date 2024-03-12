import { AddFidelityRepository } from "@/slices/fidelity/repositories";

import { AbstractHandler } from "../contracts";

export class FidelityHandler extends AbstractHandler {
  constructor(private readonly addFidelityRepository: AddFidelityRepository) {
    super();
  }
  override async handle(request: any): Promise<any> {
    if (
      request?.haveFidelity === true &&
            (request?.status === 10 || request?.status === 11)
    ) {
      const fidelityAdded = await this.addFidelityRepository.addFidelity({
        // Apos verificação acima, chama o repositório para adicionar os pontos de fidelidade
        active: true,
        ownerId: request?.ownerId,
        createdById: request?.createdById,
        name: request?.name,
        requestId: request?.requestId,
        points: request?.fidelity?.points,
        clientId: request?.clientId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      if (!fidelityAdded) {
        throw new Error("Erro ao adicionar os pontos de fidelidade pro cliente");
      }
    }
    return super.handle(request);
  }
}