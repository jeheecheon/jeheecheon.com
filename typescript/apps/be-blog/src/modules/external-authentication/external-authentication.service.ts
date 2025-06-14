import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ExternalAuthentication } from "@packages/entities-blog/external-authentication/external-authentication.entity";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class ExternalAuthenticationService {
  constructor(
    @InjectRepository(ExternalAuthentication)
    private readonly externalAuthenticationRepository: Repository<ExternalAuthentication>,
  ) {}

  async getExternalAuthentication(args: {
    accountIdFromProvider?: string;
    accountId?: string;
  }) {
    const where: FindOptionsWhere<ExternalAuthentication> = {};

    if (args.accountIdFromProvider) {
      where.accountIdFromProvider = args.accountIdFromProvider;
    }

    if (args.accountId) {
      where.accountId = args.accountId;
    }

    return this.externalAuthenticationRepository.findOne({
      where,
    });
  }

  async updateExternalAuthentication(
    args: {
      accountIdFromProvider?: string;
      accountId?: string;
    },
    externalAuthentication: Partial<ExternalAuthentication>,
  ) {
    const where: FindOptionsWhere<ExternalAuthentication> = {};

    if (args.accountIdFromProvider) {
      where.accountIdFromProvider = args.accountIdFromProvider;
    }

    if (args.accountId) {
      where.accountId = args.accountId;
    }

    return this.externalAuthenticationRepository.update(
      where,
      externalAuthentication,
    );
  }

  async upsertExternalAuthentication(
    args: {
      accountIdFromProvider?: string;
      accountId?: string;
    },
    externalAuthentication: Partial<ExternalAuthentication>,
  ) {
    const existingExternalAuthentication =
      await this.getExternalAuthentication(args);

    if (existingExternalAuthentication) {
      return this.updateExternalAuthentication(args, externalAuthentication);
    }

    return this.externalAuthenticationRepository.save({
      ...externalAuthentication,
    });
  }
}
