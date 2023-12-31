import { Controller, Get, Post, Put, Delete, Param, Query, Body, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('proof')
export class ProofController {

  // GET: Endpoint
  @Get('proof-new-endpoint')
  newEndpoint(): string {
    return 'New endpoint';
  }

  // GET: Params
  @Get('proof_number/:idProof')
  getProof1(@Param() params: any): string {
    return `Proof A id: ${params.idProof}`;
  }

  // GET: Params
  @Get('proof_string/:idProof')
  @HttpCode(HttpStatus.OK)
  getProof2(@Param('idProof') idProof: string): string {
    return `Proof B id: ${idProof}`;
  }

  // GET: Two params
  @Get('categories/:id/proofs/:proofId')
  getCategory(@Param('proofId') proofId: string, @Param('id') id: string) {
    return `Proof ${proofId} and ${id}`;
  }

  // GET: Query params
  @Get()
  getProofs(@Query('limit') limit = 10, @Query('offset') offset = 0): string {
    return `List of proofs, limit=${limit} offset=${offset}`;
  }

  //Avoid route blocking
  /*
  * The endpoint1 is blocking **endpoint2, as it is expecting a parameter :idProof,
  * and if we call localhost:3000/proofs/filter, NestJS will interpret the word "filter"
  * as the ID that the first endpoint is expecting, causing it to be impossible
  * to access the second endpoint.
  *
  * This is easily resolved by reversing their order. Place the dynamic endpoints
  * in the second position so that they do not cause any issues.
  *  */
  @Get('filter')
  endpoint2() {
    return `I'm a filter!`;
  }

  @Get(':idProof')
  endpoint1(@Param('idProof') idProof: string) {
    return `Proof ${idProof}`;
  }

  @Get('express/:id')
  @HttpCode(HttpStatus.OK)
  getWithExpress(@Res() response: Response, @Param('id') id: string) {
    response.status(200).send({
      message:`product ${id}`
    });
  }
}
