import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService implements OnModuleInit {

    private readonly logger = new Logger(SupabaseService.name);
    private supabaseClient!: SupabaseClient;

    constructor( private configService: ConfigService) {}

    onModuleInit() {
        
        const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
        const supabaseKey = this.configService.get<string>('SUPABASE_API_KEY');

        if( !supabaseKey || !supabaseUrl ) {
            throw this.logger.error('SUPABASE_URL ou SUPABASE_KEY não foram encontradas no .env');
            throw new Error('Configurações do Supabase ausentes.');
        }

        this.supabaseClient = createClient(supabaseUrl, supabaseKey);
        this.logger.log('Client do Supabase inicializado com sucesso!');
    }

    get client(): SupabaseClient {
        return this.supabaseClient;
    }
}